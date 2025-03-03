const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { addToCart, placeOrder } = require('../controllers/cartController');
const assert = require('assert');

const app = express();
app.use(bodyParser.json());
app.post('/add-to-cart', addToCart);
app.post('/place-order', placeOrder);

describe('POST /add-to-cart', () => {
  it('should add a product to the cart successfully', (done) => {
    const product = {
      id: 1,
      name: 'Test Product',
      price: 10
    };

    request(app)
      .post('/add-to-cart')
      .send({ product })
      .end((err, response) => {
        if (err) return done(err);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.message, 'Product added to cart');
        assert.deepStrictEqual(response.body.product, product);
        done();
      });
  });
});

describe('POST /place-order', () => {
  it('should place an order successfully', (done) => {
    const cart = [
      { id: 1, name: 'Test Product', price: 10 },
      { id: 2, name: 'Another Product', price: 20 }
    ];

    request(app)
      .post('/place-order')
      .send({ cart })
      .end((err, response) => {
        if (err) return done(err);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.message, 'Order placed');
        assert.deepStrictEqual(response.body.cart, cart);
        done();
      });
  });
});
