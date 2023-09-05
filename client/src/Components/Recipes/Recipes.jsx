/* eslint-disable no-unused-vars */
import React from "react";
import Recipe from "../Recipe/Recipe";
import style from "./Recipes.module.css";

const Recipes = ({ info }) => {
   return (
      <div className={style.contain}>
         {info?.map((recipe) => (
            <Recipe
               title={recipe.title}
               id={recipe.id}
               key={recipe.id}
               image={recipe.image}
               diets={recipe.diets}
               healthscore={recipe.healthScore}
               summary={recipe.summary}
               steps={recipe.steps}
            />
         ))}
      </div>
   );
};

export default Recipes;
