const request = require('supertest');
const assert = require('assert');
const app = require('../server');

describe('Termék Controller', () => {
  describe('GET /products', () => {
    it('vissza kell küldenie az összes terméket', (done) => {
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
    it('új terméket kell hozzáadnia', (done) => {
      const newProduct = {
        name: 'Próba Termék',
        category: 'Próba Kategória',
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
