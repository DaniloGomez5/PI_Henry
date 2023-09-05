import React from "react";
import style from "./Recipe.module.css";
import { NavLink } from "react-router-dom";

const Recipe = ({ title, id, image, diets, healthscore }) => {

   return (
      <div className={style.recipeCont}>
         <NavLink to={`/details/${id}`} className={style.link}>
            <div
               title={title}
               className={style.Recipe}
               style={{ backgroundImage: `url(${image})` }}
            >
               <h3 className={style.h3}>{title}</h3>
               <div className={style.diet}>
                  <ul title="Diets" className={style.customLi}>
                     {diets?.map((diet, index) => (
                        <li key={index}>{diet}</li>
                     ))}
                  </ul>
                  <h4 title="HealthScore" className={style.h4}>
                     ❤️ {healthscore}
                  </h4>
               </div>
            </div>
         </NavLink>
      </div>
   );
};

export default Recipe;


