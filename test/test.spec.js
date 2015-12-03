"use strict";
process.env.NODE_ENV = "test";
let should = require('should');
let request = require('supertest');
let app = require('../server');
let mongoose = require('mongoose');
let User = mongoose.model('User');

before((done) => {
  let user = new User();
  user.local.email = "fake@email.com";
  user.local.password = "secret";
  user.name = "Fake Person";
  user.primaryEmail = "fake@email.com";
  user.save();
  done();
});

after((done) => {
  User.collection.remove(done);
});
