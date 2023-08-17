import React, { useEffect, useState } from "react";
import Card from "../Card/Card";

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=100`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setRecipes(data.results);
      });
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recipesPerPage = 9;
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const startIndex = (currentPage - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const recipesToShow = filteredRecipes.slice(startIndex, endIndex);

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
        {recipesToShow.map((recipe) => (
          <Card
            key={recipe.id}
            id={recipe.id}
            image={recipe.image}
            name={recipe.title}
            diets={[]}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default HomePage;


