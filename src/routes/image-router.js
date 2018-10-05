'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');

const Image = require('../model/image-schema');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();


router.post('/upload/image', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(400, 'bad request'));
  }
  return new Image({
    ...request.body, // O(n)
    account: request.account._id,
    // development note:
    //   This validation can help ensure no one can mess
    //   with the account system
  }).save()
    .then(image => response.json(image))
    .catch(next);
});
