const express = require("express");
const { Recipe } = require("../db");
const axios = require("axios");
require("dotenv").config();

const getRecipes = async (req, res) => {
  let recipes = await Recipe.findAll({raw: true});
  recipes.forEach((rec) => {
    rec.source = "BDD"
  });
  console.log("Antes" + typeof(recipes));
  try {
    const apiKey = process.env.API_KEY;
    const spoonacularResponse = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`
    );

    const spoonacularRecipes = spoonacularResponse.data.results;
    spoonacularRecipes.forEach(rawRecipe => {
      rawRecipe.source = "API"
      recipes.push(rawRecipe);
    });
  console.log("Despues" + typeof(recipes));
  res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener las recetas: ${error}` });
  }
};

module.exports = getRecipes;
