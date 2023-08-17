import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setRecipeDetails(data);
      });
  }, [id]);

  if (!recipeDetails) {
    return <div>Cargando detalles de la receta...</div>;
  }

  const {
    title,
    image,
    summary,
    healthScore,
    analyzedInstructions,
    diets,
  } = recipeDetails;

  return (
    <div>
      <h2>{title}</h2>
      <img src={image} alt={title} />
      <p>Resumen del plato: <span dangerouslySetInnerHTML={{ __html: summary }} /></p>
      <p>Nivel de comida saludable: {healthScore}</p>
      <h3>Paso a paso:</h3>
      <ul>
        {analyzedInstructions[0].steps.map((step, index) => (
          <li key={index}>{step.step}</li>
        ))}
      </ul>
      <h3>Tipos de dieta:</h3>
      <ul>
        {diets.map((diet, index) => (
          <li key={index}>{diet}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeDetail;

