const express = require('express');
const axios = require('axios');
require('dotenv').config()

// Ruta para obtener todas las recetas desde la API de Spoonacular
const getRecipes= async (req, res) => {
  try {
    const apiKey = process.env.API_KEY
    const spoonacularResponse = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`
    );

    const recipes = spoonacularResponse.data.results;
    res.json(recipes);
} catch (error) {
    console.log(error); // Agrega esta línea
    res.status(500).json({ error: 'Error al obtener las recetas' });
  }
};

module.exports = getRecipes;
