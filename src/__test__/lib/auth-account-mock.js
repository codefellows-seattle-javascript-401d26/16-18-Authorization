'use strict';

const faker = require('faker');
const AuthAccount = require('../../model/auth-account-schema');

const accountMock = module.exports = {};

accountMock.pCreateMock = () => {
  const mock = {};
  mock.request = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
  };

  return AuthAccount.create(mock.request.username, mock.request.email, mock.request.password)
    .then((createdAccount) => {
      mock.account = createdAccount;
      return mock;
    })
    .catch(console.error);
};

accountMock.pCleanAccountMocks = () => AuthAccount.remove({});
