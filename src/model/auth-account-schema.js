'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto'); // produces random bytes
const jsonWebToken = require('jsonwebtoken'); // actually doing the crypto
const bcrypt = require('bcrypt'); // this handles the hashing

const accountSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tokenSeed: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

const TOKEN_SEED_LENGTH = 128;

function pCreateToken() {
  // development notes:
  //   The value of this in this function is equal to the
  //   specific object we are working with...
  this.tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
  //   Here, the token seed is a random, 'unique', long string
  return this.save()
    .then((savedAccount) => {
      // .sign, in this context, actually means encrypt
      return jsonWebToken.sign({
        tokenSeed: savedAccount.tokenSeed,
      }, process.env.APP_SECRET);
    })
    .catch((error) => {
      throw error;
    });
}

// development note: adding pCreateToken to the account's prototype
accountSchema.methods.pCreateToken = pCreateToken;
const AuthAccount = module.exports = mongoose.model('account', accountSchema);

// development note: on a production system, this would be >=9
const HASH_ROUNDS = 8;

AuthAccount.create = (username, email, password) => {
  return bcrypt.hash(password, HASH_ROUNDS)
    .then((passwordHash) => {
      password = null; // eslint-disable-line no-param-reassign
      const tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
      return new AuthAccount({
        username,
        email,
        tokenSeed,
        passwordHash,
      }).save();
    });
};
