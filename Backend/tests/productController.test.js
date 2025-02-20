const request = require('supertest');
const express = require('express');
const app = require('../server');
const productRoutes = require('../routes/productRoutes');

const app = express();
app.use(express.json());

describe('GET /products', () => {
  it('should get all products', async () => {
    const res = await request(app)
      .get('/products')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('category');
  });
});

describe('POST /products', () => {
  it('should add a new product', async () => {
    const newProduct = {
      name: 'Termék 1',
      category: 'Kategória 1',
      price: 1000,
      image: 'image_url'
    };

    const res = await request(app)
      .post('/products')
      .send(newProduct)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toHaveProperty('message', 'Termék sikeresen hozzáadva');
    expect(res.body).toHaveProperty('productId');
  });
});
