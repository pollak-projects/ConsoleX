const request = require('supertest');
const app = require('../server');
const route = require('../routes/route');

app.use()

describe('GET /order', () => {
    it('should return a 200 status and a list of orders', async () => {
        const response = await request(app)
            .get('/order')
            .expect('Content-Type', /json/)
            .expect(200); 

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });
/*
    it('should return a 500 status if there is a database error', async () => {
        const mockQuery = jest.fn((query, callback) => {
            callback(new Error('Database error'));
        });

        jest.mock('../db', () => ({
            query: mockQuery,
        }));

        const response = await request(app)
            .get('/orders')
            .expect(500);

        expect(response.body.error).toBe('Hiba történt a lekérdezéskor!');
    });*/
});
