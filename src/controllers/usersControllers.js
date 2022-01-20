const { createOneUser, userLogin } = require('../services/usersServices');
const { created, success } = require('../utils/dictionary');

const createUsers = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userCreated = await createOneUser(name, email, password);

    return res.status(created).json(userCreated);
  } catch (error) {
    console.log(`POST CREATE USERS -> ${error.message}`);
    next(error);
  }
};

const logUsers = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await userLogin(email, password);

    return res.status(success).json({ message: token });
  } catch (error) {
    console.log(`LOG USERS -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  createUsers,
  logUsers,
};
