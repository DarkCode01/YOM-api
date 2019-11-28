const request = require('supertest');
const app = require('../src/app');

const CoreComponent = require('../src/components/core/core.provider');


describe('Test main principal errors of API REST.', () => {
    test('Error 404 on whatever not defained endpoint.', () => {
        return request(app)
            .get('/404')
            .set('Accept', 'application/json')
            .expect(404)
    });

    test('OpenApi run on /api/doc', () => {
        return request(app)
            .get('/api/doc/')
            .expect(200)
    });

    test('Testing .yml string generator.', () => {
        const fileYML = CoreComponent.utils.getTemplate({ filename: 'desactivated-account' });

        expect(typeof fileYML).toBe('string');
    });
});