'use strict';
let mongoose = require('mongoose');

let ChirpSchema = new mongoose.Schema({
  message: String,
  dateCreated: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Chirp', ChirpSchema);
