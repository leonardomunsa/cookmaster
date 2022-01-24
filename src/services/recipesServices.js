const {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  uploadImage,
  getImage,
} = require('../models/recipesModels');
const errorHandling = require('../utils/errorHandling');
const { badRequest, notFound } = require('../utils/dictionary');

const entriesValidation = async (
  name,
  ingredients,
  preparation,
  { status, message },
) => {
  if (!name || !ingredients || !preparation) {
    throw errorHandling(status, message);
  }
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
  if (!recipe || recipe === null) { throw errorHandling(notFound, 'recipe not found'); }

  return recipe;
};

const updateOneRecipe = async (recipeId, recipe) => {
  await updateRecipe(recipeId, recipe);

  const updatedRecipe = await getRecipe(recipeId);

  return updatedRecipe;
};

const deleteOneRecipe = async (id) => {
  await deleteRecipe(id);
};

const uploadOneImage = async (id, img) => {
  await uploadImage(id, img);

  const recipeUpdated = await getRecipe(id);

  return recipeUpdated;
};

const getOneImage = async (img) => {
  const image = await getImage(img);

  return image;
};

module.exports = {
  createOneRecipe,
  getAllRecipes,
  getOneRecipe,
  updateOneRecipe,
  deleteOneRecipe,
  uploadOneImage,
  getOneImage,
};
