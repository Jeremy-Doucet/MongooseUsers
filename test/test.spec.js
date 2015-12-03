"use strict";
process.env.NODE_ENV = "test";
let should = require('should');
let request = require('supertest');
let app = require('../server');
let mongoose = require('mongoose');
let User = mongoose.model('User');

before((done) => {
  done();
});

after((done) => {
  User.collection.remove(done);
});
