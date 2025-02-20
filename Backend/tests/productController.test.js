const request = require('supertest');
const app = require('../server');
const route = require('../routes/productRoutes');

app.use()

describe('GET /products', () => {
    it('should return a 200 status and a list of products', async () => {
        const response = await request(app)
            .get('/products')
            .expect('Content-Type', /json/)
            .expect(200); 

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });
});
