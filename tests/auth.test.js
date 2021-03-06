const request = require('supertest');
const AccountFaker = require('./data/account');
const app = require('../src/app');
const db = require('../config/db');

describe('Test all operation of athuentication. [/api/auth]', () => {
    let data = {
        credentials: {},
        account: {},
        tokens: {}
    }

    beforeAll(async () => {
        await db.connect();

        const dataFaker = await AccountFaker.create();
        data = {
            credentials: {
                email: dataFaker.email,
                password: dataFaker.password
            },
            account: dataFaker.data
        }
    });

    afterAll(async (done) => {
        await AccountFaker.delete(data.account._id);
        await db.disconnect(done);
    });

    test('Get token with all data on body', () => {
        return request(app)
            .post('/api/auth/token')
            .send({
                email: data.credentials.email,
                password: data.credentials.password
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect('refresh' in response.body).toBe(true);
                expect('access' in response.body).toBe(true);

                expect(typeof response.body.refresh).toBe('string');
                expect(typeof response.body.access).toBe('string');

                data.tokens = {
                    refresh: response.body.refresh,
                    access: response.body.access
                }
            });
    });

    test('Refreshing token access with refresh token.', () => {
        return request(app)
            .post('/api/auth/refresh')
            .set('Accept', 'application/json')
            .send({
                token: data.tokens.refresh
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect('access' in response.body).toBe(true);
                expect(typeof response.body.access).toBe('string');
            });
    });

    test('Refreshing token access with bad request.', () => {
        return request(app)
            .post('/api/auth/refresh')
            .set('Accept', 'application/json')
            .send({
                token: data.tokens.access
            })
            .expect(401)
    });

    test('Verify token access', () => {
        return request(app)
            .post('/api/auth/verify')
            .set('Accept', 'application/json')
            .set('Authorization', `JWT ${data.tokens.access}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.tokenType === 'access').toBe(true);
                expect(response.body.isValid).toBe(true);
            });
    });


    test('Verify refresh token', () => {
        return request(app)
            .post('/api/auth/verify')
            .set('Accept', 'application/json')
            .set('Authorization', `JWT ${data.tokens.refresh}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.tokenType === 'refresh').toBe(true);
                expect(response.body.isValid).toBe(true);
            });
    });

    test('Error with username or email invalid.', () => {
        return request(app)
            .post('/api/auth/token')
            .send({
                email: 'error',
                password: 'error'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .then(response => {
                expect('statusCode' in response.body).toBe(true);
                expect('message' in response.body).toBe(true);
                expect('error' in response.body).toBe(true);
            });
    });

    test('Get token by not data on body', () => {
        return request(app)
            .post('/api/auth/token')
            .set('Accept', 'application/json')
            .expect(400)
    });
});