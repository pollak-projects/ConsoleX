const chai = require('chai');
const chaiHttp = require('chai-http');
const mysql = require('mysql');
const { expect } = chai;
const db = require('../config/db');
const { getAllProducts, addProduct } = require('../controllers/productController');

chai.use(chaiHttp);

describe('Product Controller', () => {
  let connection;

  before((done) => {
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'vizsgaremek',
    });

    connection.connect((err) => {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  after((done) => {
    connection.end(done);
  });

  describe('GET /products', () => {
    it('should return all products', (done) => {
      const req = {};
      const res = {
        json: (response) => {
          expect(response).to.have.property('products');
          expect(response.products).to.be.an('array');
          done();
        },
        status: (statusCode) => {
          expect(statusCode).to.equal(200);
          return res;
        }
      };

      getAllProducts(req, res);
    });
  });

  describe('POST /products', () => {
    it('should add a new product', (done) => {
      const req = {
        body: {
          name: 'Test Product',
          category: 'Test Category',
          price: 100,
          image: 'test_image.jpg',
        },
      };

      const res = {
        json: (response) => {
          expect(response).to.have.property('message', 'Termék sikeresen hozzáadva');
          expect(response).to.have.property('productId');
          done();
        },
        status: (statusCode) => {
          expect(statusCode).to.equal(201);
          return res;
        }
      };

      addProduct(req, res);
    });
  });
});
