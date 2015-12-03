'use strict';
let should = require('should');
let request = require('supertest');
let jwt = require('jsonwebtoken');
let app = require('../server');
let mongoose = require('mongoose');
let User = mongoose.model('User');
let Chirp = mongoose.model('Chirp');

let validToken, badToken;

describe('Chirp Routes', () => {
  before((done) => {
    User.findOne({ 'local.email': 'fake@email.com' }, (err, user) => {
      validToken = user.generateJWT();
      badToken = jwt.sign({
        _id: user._id,
        email: user.local.email
      }, 'bad secret');
      done();
    });
  });

  describe('POST /', () => {
    it('throw error - no token', (done) => {
      request(app)
        .post('/api/v1/chirps')
        .send({ message: 'test chirp' })
        .expect(401)
        .end(done);
    });
    it('throw error - invalid token', (done) => {
      request(app)
        .post('/api/v1/chirps')
        .set('authorization', `Bearer ${badToken}`)
        .send({ message: 'test chirp' })
        .expect(401)
        .end(done);
    });
    it('create a chirp', (done) => {
      request(app)
        .post('/api/v1/chirps')
        .set('authorization', `Bearer ${validToken}`)
        .send({ message: 'test chirp' })
        .expect(200)
        .end(done);
    });
  });
});
