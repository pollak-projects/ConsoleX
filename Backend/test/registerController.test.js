const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { registerUser } = require('../controllers/registerController');
const assert = require('assert');

const app = express();
app.use(bodyParser.json());
app.post('/register', registerUser);

describe('POST /register', () => {
  it('sikeresen regisztrálnia kell egy felhasználót', (done) => {
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

  it('500-as hibát kell visszaadnia belső szerverhibák esetén', (done) => {
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
