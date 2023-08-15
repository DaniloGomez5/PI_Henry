const { Router } = require('express');
const getRecipesById = require('./getRecipesById');
const { conn } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes/:idRecipe', getRecipesById)


module.exports = router;