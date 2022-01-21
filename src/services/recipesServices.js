const { createRecipe, getRecipes } = require('../models/recipesModels');
const errorHandling = require('../utils/errorHandling');
const { badRequest } = require('../utils/dictionary');

const entriesValidation = async (
  name,
  ingredients,
  preparation,
  { status, message },
) => {
  if (!name || !ingredients || !preparation) { throw errorHandling(status, message); }
};

const createOneRecipe = async (name, ingredients, preparation, userId) => {
  await entriesValidation(name, ingredients, preparation, {
    status: badRequest,
    message: 'Invalid entries. Try again.',
  });

  const id = await createRecipe(name, ingredients, preparation, userId);

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: id,
    },
  };
};

const getAllRecipes = async () => {
  const recipes = await getRecipes();

  return recipes;
};

module.exports = {
  createOneRecipe,
  getAllRecipes,
};
