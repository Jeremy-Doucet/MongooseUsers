'use strict';
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Chirp = mongoose.model('Chirp');
let User = mongoose.model('User');
let jwt = require('express-jwt');
let auth = jwt({
  userProperty: 'payload',
  secret: 'coder camps!'
});

// GET /api/v1/chirps
router.get('/', (req, res, next) => {
  Chirp.find({})
    .populate('createdBy', 'local.email')
    .exec((err, result) => {
      if(err) return next(err);
      res.send(result);
    });
});

// POST /api/v1/chirps
router.post('/', auth, (req, res, next) => {
  // user ID is: req.payload._id
  let chirp = new Chirp(req.body);
  chirp.createdBy = req.payload._id;
  chirp.save((err, result) => {
    if(err) return next(err);
    if(!result) return next(`Could not create result`);
    User.update({ _id: req.payload._id }, { $push: { chirps: result._id }}, (err, user) => {
      if(err) return next(err);
      if(!user) return next(`Could not push chirp into user`);
      res.send(result);
    });
  });
});


module.exports = router;
