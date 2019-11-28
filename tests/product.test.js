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

    test('Test creating a new product without images', () => {
        return request(app)
            .post('/api/products')
            .set('Authorization', `JWT ${data.token}`)
            .field('name', data.product.name)
            .field('description', data.product.description)
            .field('price', data.product.price)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body.error.message === 'The min of images is (1).').toBe(true);
            });
    });

    test('Test creating a new product with more than 5 images', () => {
        return request(app)
            .post('/api/products')
            .set('Authorization', `JWT ${data.token}`)
            .field('name', data.product.name)
            .field('description', data.product.description)
            .field('price', data.product.price)
            .attach('images', 'tests/data/images/test-image.jpg')
            .attach('images', 'tests/data/images/test-image.jpg')
            .attach('images', 'tests/data/images/test-image.jpg')
            .attach('images', 'tests/data/images/test-image.jpg')
            .attach('images', 'tests/data/images/test-image.jpg')
            .attach('images', 'tests/data/images/test-image.jpg')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body.error.message === 'The max of images is (5).').toBe(true);
            });
    });

    test('Test creating a new produc with other file', () => {
        return request(app)
            .post('/api/products')
            .set('Authorization', `JWT ${data.token}`)
            .field('name', data.product.name)
            .field('description', data.product.description)
            .field('price', data.product.price)
            .attach('images', 'package.json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body.error.message === 'Only .png, .jpg and .jpeg format allowed!').toBe(true);
            });
    });

    test('Test creating a new product.', () => {
        return request(app)
            .post('/api/products')
            .set('Authorization', `JWT ${data.token}`)
            .field('name', data.product.name)
            .field('description', data.product.description)
            .field('price', data.product.price)
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

    test('Get info of product by _id', () => {
        return request(app)
            .get(`/api/products/${data.product._id}`)
            .set('Authorization', `JWT ${data.token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.data.name === data.product.name).toBe(true);
                expect(response.body.data.description === data.product.description).toBe(true);
                expect(response.body.data.price === Number(data.product.price)).toBe(true);
            })
    });

    test('Get all product.', () => {
        return request(app)
            .get(`/api/products`)
            .set('Authorization', `JWT ${data.token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect('count' in response.body).toBe(true);
                expect('results' in response.body).toBe(true);

                expect(typeof response.body.count).toBe('number');
                expect(typeof response.body.results).toBe('object');

                expect(response.body.count === 1).toBe(true);
            })
    });

    test('Delete a product.', () => {
        return request(app)
            .delete('/api/products')
            .set('Authorization', `JWT ${data.token}`)
            .send({
                id: data.product._id
            })
            .expect('Content-Type', /json/)
            .expect(200)
    });
});