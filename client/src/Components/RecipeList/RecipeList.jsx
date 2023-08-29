import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import style from "./RecipeList.module.css"
const FilterRecipes = ({ name, id, image, diets, healthscore, summary, steps }) => {
    console.log("Diets:", diets);
   return (
      <div>
         <NavLink to={`/details/${id}`}>
            <img src={image} alt={name} />
            <p>{name}</p>
         </NavLink>
      </div>
   );
};

const RecipeList = () => {
   const filterRecipes = useSelector(state => state.filterRecipes); // Accede al estado desde Redux

   return (
      <div className={style.recipeContainer}>
         <ul className={style.list}>
            {filterRecipes?.map(recipe => (
               <li key={recipe.id}>
                  <FilterRecipes
                     name={recipe.title}
                     id={recipe.id}
                     image={recipe.image}
                     diets={recipe.diets}
                     healthscore={recipe.healthscore}
                     summary={recipe.summary}
                     steps={recipe.steps}
                  />
               </li>
            ))}
         </ul>
      </div>
   );
};

export default RecipeList;
