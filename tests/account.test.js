const request = require('supertest');
const faker = require('faker');

const AccountFaker = require('./data/account');
const app = require('../src/app');
const db = require('../config/db');


describe('Test Account controllers. [/api/accounts]', () => {
    let data = {
        account: {},
        token: null
    }

    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async (done) => {
        await AccountFaker.delete(data.account._id);
        await db.disconnect(done);
    });

    test('Create a new Account for the controller.', () => {
        return request(app)
            .post('/api/accounts')
            .send({
                username: faker.internet.userName(),
                firts_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response => {
                expect('gravatar' in response.body.data).toBe(true);
                expect('username' in response.body.data).toBe(true);
                expect('firts_name' in response.body.data).toBe(true);
                expect('last_name' in response.body.data).toBe(true);
                expect('email' in response.body.data).toBe(true);
                expect('email_confirmed' in response.body.data).toBe(true);
                expect('password' in response.body.data).toBe(true);
                expect('manage' in response.body.data).toBe(true);
                expect('employed' in response.body.data).toBe(true);
                expect('products_published' in response.body.data).toBe(true);

                data.account = response.body.data;
                data.token = AccountFaker.token(data.account);
            });
    });

    test('Get all account with token authorization.', () => {
        return request(app)
            .get('/api/accounts')
            .set('Accept', 'application/json')
            .set('Authorization', `JWT ${data.token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect('count' in response.body).toBe(true);
                expect('results' in response.body).toBe(true);

                expect(typeof response.body.count).toBe('number');
                expect(typeof response.body.results).toBe('object');
            })
    });

    test('Get all account without token.', () => {
        return request(app)
            .get('/api/accounts')
            .expect(401)
    });
});