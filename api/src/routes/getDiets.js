const axios = require('axios');
const { Diets } = require('../db'); // Asegúrate de importar correctamente el modelo
require('dotenv').config();

const getDiets = async (req, res) => {
  try {
    // Intenta buscar todas las dietas en la base de datos
    let diets = await Diets.findAll();

    // Si no hay dietas en la base de datos, obtén las dietas de la API y guárdalas
    if (!diets.length) {
      const apiKey = process.env.API_KEY;
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=&number=5222&addRecipeInformation=true&apiKey=${apiKey}`
      );
      /* console.log("API Response:", response.data); */
      const apiDiets = response.data.results.reduce((dietsArray, recipe) => {
        /* console.log("Diet data from API:", recipe.diets); */
        return dietsArray.concat(recipe.diets);
      }, []);

      const uniqueDiets = [...new Set(apiDiets)].sort();

      // Crea las dietas en la base de datos a partir de los datos de la API
      await Diets.bulkCreate(uniqueDiets.map(name => ({ name })));

      // Vuelve a buscar las dietas después de haberlas guardado
      diets = await Diets.findAll();
    }

    res.json(diets);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = getDiets;




