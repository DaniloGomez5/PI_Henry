/* const { v4 } = require('uuid'); */
const express = require('express');
const { Recipe, Diets } = require('../db'); // Importa los modelos Recipe y Diets
const { Op } = require('sequelize');

// Ruta para crear una nueva receta
const postRecipe = async (req, res) => {
  const { title, image, summary, healthScore, steps, diets } = req.body;
  // Generar uuid
  try {
   /*  const id = v4() */
    // Crea la receta en la base de datos
    const newRecipe = await Recipe.create({
 /*      id, */
      title,
      image,
      summary,
      diets,
      healthScore,
      steps,
    });

    // Busca los tipos de dieta por nombre en el arreglo recibido en 'diets'
    const dietRecords = await Diets.findAll({
      where: {
        name: {
          [Op.in]: diets, // Utiliza el operador 'IN' para buscar varios nombres
        },
      },
    });

    // Asocia los tipos de dieta a la receta
    await newRecipe.addDiets(dietRecords);

    res.status(201).json({ message: 'Receta creada exitosamente' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ message: `Error en el servidor ${error}` });
  }
};

module.exports = postRecipe;
