const {
  createOneRecipe,
  getAllRecipes,
  getOneRecipe,
  updateOneRecipe,
  deleteOneRecipe,
  uploadOneImage,
} = require('../services/recipesServices');
const { created, success, noContent } = require('../utils/dictionary');

const createRecipes = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;

    const recipeCreated = await createOneRecipe(
      name,
      ingredients,
      preparation,
      _id,
    );

    return res.status(created).json(recipeCreated);
  } catch (error) {
    console.log(`POST CREATE RECIPES -> ${error.message}`);
    next(error);
  }
};

const getRecipes = async (req, res, next) => {
  try {
    const recipesReturned = await getAllRecipes();

    return res.status(success).json(recipesReturned);
  } catch (error) {
    console.log(`GET RECIPES -> ${error.message}`);
    next(error);
  }
};

const getRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await getOneRecipe(id);

    return res.status(success).json(recipe);
  } catch (error) {
    console.log(`GET RECIPE -> ${error.message}`);
    next(error);
  }
};

const updateRecipes = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;

    const recipe = {
      name,
      ingredients,
      preparation,
    };

    const updatedRecipe = await updateOneRecipe(id, recipe);

    return res.status(success).json(updatedRecipe);
  } catch (error) {
    console.log(`PUT RECIPE -> ${error.message}`);
    next(error);
  }
};

const deleteRecipes = async (req, res, next) => {
  try {
    const { id } = req.params;

    await deleteOneRecipe(id);

    return res.status(noContent).json();
  } catch (error) {
    console.log(`DELETE RECIPE -> ${error.message}`);
    next(error);
  }
};

const uploadImages = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { filename } = req.file;

    const updatedRecipe = await uploadOneImage(id, filename);

    return res.status(success).json(updatedRecipe);
  } catch (error) {
    console.log(`PUT UPLOAD IMAGE -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  createRecipes,
  getRecipes,
  getRecipe,
  updateRecipes,
  deleteRecipes,
  uploadImages,
};
