const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const uploadImg = require('../middlewares/uploadImg');
const auth = require('../middlewares/auth');
const errorHandler = require('../middlewares/errorHandler');
const { createUsers, logUsers } = require('../controllers/usersControllers');
const {
  createRecipes,
  getRecipes,
  getRecipe,
  updateRecipes,
  deleteRecipes,
  uploadImages,
  getImages,
} = require('../controllers/recipesControllers');

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
app.put('/recipes/:id', auth, updateRecipes);
app.delete('/recipes/:id', auth, deleteRecipes);
app.put('/recipes/:id/image/', auth, uploadImg.single('image'), uploadImages);
app.get('/images/:img', getImages);

app.use(errorHandler);

module.exports = app;
