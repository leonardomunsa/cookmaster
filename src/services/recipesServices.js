const { createRecipe, getRecipes, getRecipe } = require('../models/recipesModels');
const errorHandling = require('../utils/errorHandling');
const { badRequest, notFound } = require('../utils/dictionary');

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

const getOneRecipe = async (id) => {
  const recipe = await getRecipe(id);
  if (!recipe || recipe === null) throw errorHandling(notFound, 'recipe not found');

  return recipe;
};

module.exports = {
  createOneRecipe,
  getAllRecipes,
  getOneRecipe,
};
