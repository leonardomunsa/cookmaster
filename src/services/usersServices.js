// const Joi = require('joi');
const authService = require('./authService');
const { findUserByEmail, createUser } = require('../models/usersModels');
const {
  badRequest,
  conflict,
  unauthorized,
} = require('../utils/dictionary');
const errorHandling = require('../utils/errorHandling');

// email regex: https://regexr.com/3e48o
const entriesValidation = async (name, email, password, { status, message }) => {
  if (!name || !email || !password) throw errorHandling(status, message);
};

const emailValidation = async (email, status, message) => {
  const regex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!regex.test(email)) throw errorHandling(status, message);
};

const createOneUser = async (name, email, password) => {
  const error = {
    status: badRequest,
    message: 'Invalid entries. Try again.',
  };
  await entriesValidation(name, email, password, error);
  await emailValidation(email, badRequest, 'Invalid entries. Try again.');

  const userEmail = await findUserByEmail(email);
  if (userEmail) throw errorHandling(conflict, 'Email already registered');

  const user = await createUser(name, email, password);

  return {
    user: {
      _id: user.insertedId,
      name,
      email,
      role: 'user',
    },
  };
};

const userLogin = async (email, password) => {
  const error = {
    status: unauthorized,
    message: 'All fields must be filled',
  };
  await entriesValidation('default', email, password, error);
  await emailValidation(email, unauthorized, 'Incorrect username or password');

  const user = await findUserByEmail(email);
  if (!user || user.password !== password) {
    throw errorHandling(unauthorized, 'Incorrect username or password');
  }

  const { password: _password, ...userWithoutPassword } = user;

  const token = authService.generateToken(userWithoutPassword);

  return token;
};

module.exports = {
  createOneUser,
  userLogin,
};
