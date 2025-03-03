const request = require('supertest');
const assert = require('assert');
const app = require('../server');

describe('Product Controller', () => {
  describe('GET /products', () => {
    it('should return all products', (done) => {
      request(app)
        .get('/products')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.strictEqual(res.body.products instanceof Array, true);
          done();
        });
    });
  });

  describe('POST /products', () => {
    it('should add a new product', (done) => {
      const newProduct = {
        name: 'Sample Product',
        category: 'Sample Category',
        price: 100,
        image: 'sample-image-url'
      };

      request(app)
        .post('/products')
        .send(newProduct)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          assert.strictEqual(res.body.message, 'Termék sikeresen hozzáadva');
          assert.ok(res.body.productId);
          done();
        });
    });
  });
});
