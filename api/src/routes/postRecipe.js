const express = require("express");
const { Recipe, Diets } = require("../db");
const { Op } = require("sequelize");
const postRecipe = async (req, res) => {
  const { title, image, summary, healthScore, steps, diets } = req.body;

  try {
    const newRecipe = await Recipe.create({
      title,
      image,
      summary,
      diets,
      healthScore,
      steps,
    });

    const dietRecords = await Diets.findAll({
      where: {
        name: {
          [Op.in]: diets,
        },
      },
    });

    await newRecipe.addDiets(dietRecords);

    res.status(201).json({ message: "Receta creada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: `Error en el servidor ${error}` });
  }
};

module.exports = postRecipe;
