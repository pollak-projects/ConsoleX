const http = require('http');
const assert = require('assert');

describe('Products API', () => {
  
  it('GET /api/products should return all products', (done) => {
    http.get('http://localhost:3000/api/products', (res) => {
      assert.strictEqual(res.statusCode, 200);

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const result = JSON.parse(data);
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(Array.isArray(result.products), true);
        done();
      });
    });
  });

  it('POST /api/products should add a new product', (done) => {
    const postData = JSON.stringify({
      name: 'New Product',
      category: 'Category1',
      price: 100,
      image: 'image_url'
    });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/products',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };

    const req = http.request(options, (res) => {
      assert.strictEqual(res.statusCode, 201);

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const result = JSON.parse(data);
        assert.strictEqual(result.message, 'Termék sikeresen hozzáadva');
        assert.strictEqual(typeof result.productId, 'number');
        done();
      });
    });

    req.on('error', (err) => {
      done(err);
    });

    req.write(postData);
    req.end();
  });
});
