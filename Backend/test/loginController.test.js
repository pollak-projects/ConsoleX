const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { loginUser } = require('../controllers/loginController');
const assert = require('assert');

const app = express();
app.use(bodyParser.json());
app.post('/login', loginUser);

describe('POST /login', () => {
  it('sikeresen be kell jelentkeznie egy felhasználónak', (done) => {
    const user = {
      email: 'testuser@example.com',
      password: 'testpassword'
    };

    request(app)
      .post('/login')
      .send(user)
      .end((err, response) => {
        if (err) return done(err);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.message, 'Sikeres bejelentkezés');
        assert.strictEqual(response.body.token, 'dummy-token');
        assert.strictEqual(response.body.username, 'user'); 
        done();
      });
  });

  it('400-as hibát kell visszaadnia érvénytelen e-mail cím vagy jelszó miatt', (done) => {
    const user = {
      email: 'invalidemail@example.com',
      password: 'wrongpassword'
    };

    request(app)
      .post('/login')
      .send(user)
      .end((err, response) => {
        if (err) return done(err);
        assert.strictEqual(response.status, 400);
        assert.strictEqual(response.body.message, 'Helytelen email vagy jelszó');
        done();
      });
  });

  it('500-as hibát kell visszaadnia belső szerverhibák esetén', (done) => {
    request(app)
      .post('/login')
      .send({})
      .end((err, response) => {
        if (err) return done(err);
        assert.strictEqual(response.status, 500);
        assert.strictEqual(response.body.message, 'Belső szerverhiba');
        done();
      });
  });
});
