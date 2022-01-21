const { createOneRecipe } = require('../services/recipesServices');
const { created } = require('../utils/dictionary');

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

module.exports = {
  createRecipes,
};
