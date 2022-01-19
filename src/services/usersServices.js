// const Joi = require('joi');
const { findUserByEmail, createUser } = require('../models/usersModels');
const { badRequest, conflict } = require('../utils/dictionary');
const errorHandling = require('../utils/errorHandling');

// email regex: https://regexr.com/3e48o
const entriesValidation = async (name, email, password) => {
  const regex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!name || !email || !(regex.test(email)) || !password) {
    throw errorHandling(badRequest, 'Invalid entries. Try again.');
  }
};

const createOneUser = async (name, email, password) => {
  await entriesValidation(name, email, password);

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

module.exports = {
  createOneUser,
};
