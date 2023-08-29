/* eslint-disable no-unused-vars */
import React from "react";
import Recipe from "../Recipe/Recipe";
import style from "./Recipes.module.css";

const Recipes = ({ info }) => {
   return (
      <div className={style.contain}>
         {info?.map((recip, index) => (
            <Recipe
               name={recip.title}
               id={recip.id}
               key={index}
               image={recip.image}
               diets={recip.diets}
               healthscore={recip.healthScore}
               summary={recip.summary}
               steps={recip.steps}
            />
         ))}
      </div>
   );
};

export default Recipes;
