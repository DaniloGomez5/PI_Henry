const express = require("express");
const axios = require("axios");
require("dotenv").config();

const getRecipes = async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const spoonacularResponse = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`
    );

    const recipes = spoonacularResponse.data.results;
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las recetas" });
  }
};

module.exports = getRecipes;
