const connection = require('./connection');

const findUserByEmail = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });

  return user;
};

const createUser = async (name, email, password) => {
  const db = await connection();
  const { insertedId } = await db
    .collection('users')
    .insertOne({ name, email, password, role: 'user' });

  return { insertedId };
};

module.exports = {
  findUserByEmail,
  createUser,
};
