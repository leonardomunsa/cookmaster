const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const auth = require('../middlewares/auth');
const errorHandler = require('../middlewares/errorHandler');
const { createUsers, logUsers } = require('../controllers/usersControllers');
const { createRecipes, getRecipes, getRecipe } = require('../controllers/recipesControllers');

const app = express();

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', createUsers);
app.post('/login', logUsers);
app.post('/recipes', auth, createRecipes);
app.get('/recipes', getRecipes);
app.get('/recipes/:id', getRecipe);

app.use(errorHandler);

module.exports = app;
