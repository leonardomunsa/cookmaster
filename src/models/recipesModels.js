const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const { insertedId } = await db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

  return insertedId;
};

module.exports = {
  createRecipe,
};
