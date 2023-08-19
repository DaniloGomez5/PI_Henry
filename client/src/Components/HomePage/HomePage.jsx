import React, { useEffect, useState } from "react";
import Card from "../Card/Card";

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/allrecipes`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setRecipes(data);
      });
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <h1>Home Page</h1>
      <input
        type="text"
        placeholder="Buscar recetas por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <Card
            key={recipe.id}
            id={recipe.id}
            image={recipe.image}
            name={recipe.title}
            diets={recipe.diets}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;



