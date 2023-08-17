const express = require("express");
const { Recipe, Diets } = require("../db");
const axios = require("axios");
require("dotenv").config();

const getRecipesById = async (req, res) => {
  const idRecipe = req.params.idRecipe;

  try {
    let recipe;
    recipe = await Recipe.findByPk(idRecipe, {
      include: {
        model: Diets,
        through: "RecipeDiets",
      },
    });
    if (!recipe) {
      const apiKey = process.env.API_KEY;

      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${apiKey}`
      );
      recipe = response.data;
    }
    if (!recipe) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = getRecipesById;
