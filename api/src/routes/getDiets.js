const axios = require("axios");
const { Diets } = require("../db");
require("dotenv").config();

const getDiets = async (req, res) => {
  try {
    let diets = await Diets.findAll();

    if (!diets.length) {
      const apiKey = process.env.API_KEY;
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=&number=5222&addRecipeInformation=true&apiKey=${apiKey}`
      );

      const apiDiets = response.data.results.reduce((dietsArray, recipe) => {
        return dietsArray.concat(recipe.diets);
      }, []); 

      const uniqueDiets = [...new Set(apiDiets)].sort();

      await Diets.bulkCreate(uniqueDiets.map((name) => ({ name })));

      diets = await Diets.findAll();
    }

    res.json(diets);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = getDiets;
