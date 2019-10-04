const settings = require('../../config/settings.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    select: false, 
  },
});


// hash user password before saving into database
UserSchema.pre('save', function(next){
  const hash = crypto.createHash('sha256');
  hash.update(this.password);
  this.password = hash.digest('hex')
  next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User; 