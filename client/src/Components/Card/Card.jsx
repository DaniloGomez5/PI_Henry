import React from "react";
import { Link } from "react-router-dom";

function Card({ id, image, name, diets }) {
  console.log(id, name, diets);

  // Comprobar si 'diets' es un array antes de usar 'map'
  const dietsArray = Array.isArray(diets) ? diets : [];

  return (
    <Link to={`/recipe/${id}`}>
      <div className="card">
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <div className="diets">
          {dietsArray.map((diet, index) => (
            <span key={index}>{diet}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default Card;
