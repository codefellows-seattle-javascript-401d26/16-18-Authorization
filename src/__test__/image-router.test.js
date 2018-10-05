'use strict';

const faker = require('faker');
const superagent = require('superagent');
const server = require('../lib/server');
// const imageMock = require('./lib/image-mock');
const authAccountMock = require('./lib/auth-account-mock');

const API_URL = `http://localhost:${process.env.PORT}/upload/image`;

describe('testing route /upload/image', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  beforeEach(authAccountMock.pCleanAuthAccountMocks);

  test('should respond with 200 status code and an image', () => {
    return authAccountMock.pCreateMock()
      .then((mock) => {
        return superagent.post(API_URL)
          .set('Authorization', `Bearer ${mock.token}`)
          .send({
            title: faker.lorem.words(3),
            url: faker.internet.url(),
            // development note: the account id will be tied by the route itself
          });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });
});
