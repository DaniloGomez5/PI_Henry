const express = require("express");
const { Recipe } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { Op } = require("sequelize");

const getRecipesByName = async (req, res) => {
  const Name = req.query.name;
  try {
    let recipes = await Recipe.findAll({
      where: {
        title: {
          [Op.iLike]: `%${Name}%`,
        },
      },
      raw: true
    });
    recipes.forEach((rec) => {
      rec.source = "BDD"
    });
    {
      const apiKey = process.env.API_KEY;
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${Name}&addRecipeInformation=true`
      );
      const apiRecipes = response.data.results;
      apiRecipes.forEach(rawRecipe => {
        rawRecipe.source = "API"
        recipes.push(rawRecipe);
      });
    }
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: `Error en el servidor. ${error} (error)` });
  }
};

module.exports = getRecipesByName;
