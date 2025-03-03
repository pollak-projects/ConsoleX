const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { registerUser } = require('../controllers/registerController');
const assert = require('assert');

const app = express();
app.use(bodyParser.json());
app.post('/register', registerUser);

describe('POST /register', () => {
  it('should register a user successfully', (done) => {
    const user = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword'
    };

    request(app)
      .post('/register')
      .send(user)
      .end((err, response) => {
        if (err) return done(err);
        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.message, 'Sikeres regisztráció!');
        done();
      });
  });

  it('should return a 500 error for internal server errors', (done) => {
    const user = {
      username: '',
      email: 'invalidemail',
      password: 'testpassword'
    };

    request(app)
      .post('/register')
      .send(user)
      .end((err, response) => {
        if (err) return done(err);
        assert.strictEqual(response.status, 500);
        assert.strictEqual(response.body.message, 'Belső szerverhiba');
        done();
      });
  });
});
