const { createOneUser } = require('../services/usersServices');
const { created } = require('../utils/dictionary');

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

module.exports = {
  createUsers,
};
