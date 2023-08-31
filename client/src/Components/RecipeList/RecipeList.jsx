import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import style from "./RecipeList.module.css";

const RecipeList = ({ recipes }) => {
   return (
      <div className={style.recipeContainer}>
         <ul className={style.list}>
            {recipes?.map(recipe => (
               <li key={recipe.id}>
                  <NavLink to={`/details/${recipe.title}`}>
                     <img src={recipe.image} alt={recipe.title} />
                     <p>{recipe.title}</p>
                  </NavLink>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default RecipeList;


