const { Router } = require('express');
const getRecipesById = require('./getRecipesById');
const getRecipesByName = require('./getRecipesByName');
const postRecipe = require('./postRecipe');
const getDiets = require('./getDiets');
const getRecipes = require('./getRecipes');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes/name', getRecipesByName);
router.get('/recipes/:idRecipe', getRecipesById);
router.get('/diets', getDiets)
router.get('/allrecipes', getRecipes)
router.post('/recipes', postRecipe)


module.exports = router;