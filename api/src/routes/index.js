const { Router } = require('express');
const getRecipesById = require('./getRecipesById');
const getRecipesByName = require('./getRecipesByName');
const postRecipe = require('./postRecipe');
const getDiets = require('./getDiets');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes/name', getRecipesByName);
router.use('/recipes/:idRecipe', getRecipesById);
router.use('/diets', getDiets)
router.post('/recipes', postRecipe)


module.exports = router;