const request = require('supertest');
const faker = require('faker');

const AccountFaker = require('./data/account');
const app = require('../src/app');
const db = require('../config/db');


describe('Test Account controllers. [/api/accounts]', () => {
    let data = {
        account: {},
        token: null,
        refresh: null,
        messageError: {
            statusCode: 400,
            message: 'Bad Request',
            error:
             { '0':
                { value: 'na',
                  msg:
                   'The username is not valid, contain character not permmited.',
                  param: 'username',
                  location: 'body' },
               '1':
                { value: 'na',
                  msg: 'The characters of username is min: 4, max: 30',
                  param: 'username',
                  location: 'body' },
               message: 'Bad Request' }
        }
    }

    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async (done) => {
        await AccountFaker.delete(data.account._id);
        await db.disconnect(done);
    });

    test('Create a new account with bad request.', () => {
        return request(app)
            .post('/api/accounts')
            .send({
                username: 'na',
                firts_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body.error['0'].msg === data.messageError.error['0'].msg);
                expect(JSON.stringify(response.body) === JSON.stringify(data.messageError.error));
            });
    });

    test('Create a new Account for the controller.', () => {
        return request(app)
            .post('/api/accounts')
            .send({
                username: faker.internet.userName('darkc'), // To generate username with more 4 characters.
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
                expect('manager' in response.body.data).toBe(true);
                expect('employed' in response.body.data).toBe(true);
                expect('products_published' in response.body.data).toBe(true);

                data.account = response.body.data;
                data.token = AccountFaker.token(data.account, 'access');
                data.refresh = AccountFaker.token(data.account, 'refresh');
            });
    });

    test('Get Info of account by _id', () => {
        return request(app)
            .get(`/api/accounts/${data.account._id}`)
            .set('Accept', 'application/json')
            .set('Authorization', `JWT ${data.token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect('gravatar' in response.body.account).toBe(true);
                expect('username' in response.body.account).toBe(true);
                expect('firts_name' in response.body.account).toBe(true);
                expect('last_name' in response.body.account).toBe(true);
                expect('email' in response.body.account).toBe(true);
                expect('email_confirmed' in response.body.account).toBe(true);
                expect('manager' in response.body.account).toBe(true);
                expect('employed' in response.body.account).toBe(true);
                expect('products_published' in response.body.account).toBe(true);
            });
    });

    test('Get info of account by _id with bad token access.', () => {
        return request(app)
            .get(`/api/accounts/${data.account._id}`)
            .set('Accept', 'application/json')
            .set('Authorization', `JWT ${data.refresh}`)
            .expect('Content-Type', /json/)
            .expect(401)
    });

    test('Updating Status of account.', () => {
        return request(app)
            .patch(`/api/accounts/${data.account._id}/status`)
            .set('Accept', 'application/json')
            .set('Authorization', `JWT ${data.token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.account.is_active === !data.account.is_active).toBe(true);
            });
    });

    test('Updating info of account by _id', () => {
        const first_name = faker.name.firstName();

        return request(app)
            .patch(`/api/accounts/${data.account._id}`)
            .set('Accept', 'application/json')
            .set('Authorization', `JWT ${data.token}`)
            .send({
                first_name: first_name
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.account.first_name === first_name).toBe(true);
            });
    });

    test('Updating info of account by _id with bad request', () => {
        return request(app)
            .patch(`/api/accounts/${data.account._id}`)
            .set('Accept', 'application/json')
            .set('Authorization', `JWT ${data.token}`)
            .send({
                username: 'na'
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body.error['0'].msg === data.messageError.error['0'].msg);
                expect(JSON.stringify(response.body) === JSON.stringify(data.messageError.error));
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
});