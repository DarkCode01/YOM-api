const request = require('supertest');
const app = require('../src/app');

describe('Test main principal errors of API REST.', () => {
    test('Error 404 on whatever not defained endpoint.', () => {
        return request(app)
            .get('/404')
            .set('Accept', 'application/json')
            .expect(404)
    });
});