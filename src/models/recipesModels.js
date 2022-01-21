const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const { insertedId } = await db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

  return insertedId;
};

const getRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();

  return recipes;
};

const getRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = await db
    .collection('recipes')
    .findOne({ _id: new ObjectId(id) });

  return recipe;
};

const updateRecipe = async (recipeId, recipe) => {
  const db = await connection();
  const updatedRecipe = await db
    .collection('recipes')
    .updateOne({ _id: new ObjectId(recipeId) }, { $set: { ...recipe } });

  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  const db = await connection();
  await db.collection('recipes').deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};
