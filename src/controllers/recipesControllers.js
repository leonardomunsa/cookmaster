const { createOneRecipe, getAllRecipes, getOneRecipe } = require('../services/recipesServices');
const { created, success } = require('../utils/dictionary');

const createRecipes = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;

    const recipeCreated = await createOneRecipe(name, ingredients, preparation, _id);
    
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

module.exports = {
  createRecipes,
  getRecipes,
  getRecipe,
};
