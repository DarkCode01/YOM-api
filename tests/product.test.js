const request = require('supertest');
const faker = require('faker');

const app = require('../src/app');
const db = require('../config/db');

const ProductFaker = require('./data/product');
const AccountFaker = require('./data/account');
const ImageFaker = require('./data/image');


describe('Test Product controllers. [/api/products]', () => {
    let data = {
        token: {},
        account: {},
        product: {}
    }

    beforeAll(async () => {
        await db.connect();

        const dataFaker = await AccountFaker.create();

        data.account = dataFaker.data;
        data.token = AccountFaker.token(data.account);
        data.product = ProductFaker.create();
    });

    afterAll(async (done) => {
        for (let image of data.product.images) {
            await ImageFaker.delete(image);
        }

        await AccountFaker.delete(data.account._id);
        await ProductFaker.delete(data.product._id);
        await db.disconnect(done);
    });

    test('Test creating a new product without token.', () => {
        return request(app)
            .post('/api/products')
            .set('Accept', 'application/json')
            .expect(401)
    });

    test('Test creating a new product without data on body', () => {
        return request(app)
            .post('/api/products')
            .set('Accept', 'application/json')
            .set('Authorization', `JWT ${data.token}`)
            .expect(400)
    });

    test('Test creating a new product.', () => {
        return request(app)
            .post('/api/products')
            .set('Authorization', `JWT ${data.token}`)
            .field('name', data.product.name)
            .field('description', data.product.description)
            .field('price', 100000)
            .attach('images', 'tests/data/images/test-image.jpg')
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response => {
                expect(response.body.data.name === data.product.name).toBe(true);
                expect(response.body.data.description === data.product.description).toBe(true);
                expect(response.body.data.price === Number(data.product.price)).toBe(true);

                data.product = response.body.data;
            })
    });
});