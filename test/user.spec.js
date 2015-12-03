"use strict";
let should = require('should');
let request = require('supertest');
let app = require('../server');
let mongoose = require('mongoose');
let User = mongoose.model('User');

describe('User Routes', () => {
  describe('Registration', () => {
    it('Should let me create a new user', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send({ email: 'test@fake.com', password: 'secret' })
        .expect(200)
        .end(done);
    });
    it('Should create the user', (done) => {
      User.findOne({ 'local.email': 'test@fake.com' }, (err, result) => {
        should.equal(err, null);
        should.exist(result);
        should.equal(result.local.email, "test@fake.com");
        result.local.password.should.not.equal('secret');
        done();
      });
    });
    it('throw err - email exists', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send({ email: 'test@fake.com', password: 'secret' })
        .expect(500)
        .end(done);
    });
  }); // End of register
  describe('Login', () => {
    it('Should let me log in', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({ email: 'test@fake.com', password: 'secret' })
        .expect(200)
        .end(done);
    });
    it('throw error - email doesnt exist', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({ email: 'invalid@fake.com', password: 'secret' })
        .expect(500)
        .end(done);
    });
    it('throw error - password incorrect', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({ email: 'test@fake.com', password: 's3cr3t' })
        .expect(500)
        .end(done);
    });
  });
});
