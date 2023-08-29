/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import style from "./HomePage.module.css";
import NavBar from "../../Components/NavBar/NavBar";
import Recipes from "../../Components/Recipes/Recipes";
import RecipeList from "../../Components/RecipeList/RecipeList";
import { FilterByDiets, FilterBySource, OrderName, getAllRecipes, getDiets, page } from "../../redux/actions";
/* import Footer from "../../Components/Footer/Footer"; */

const HomePage = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allHomeRecipes);
  const allDiets = useSelector((state) => state.dietTypes);

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  const paginate = (event) => {
    dispatch(page(event.target.name));
  };

  const handleOrderByName = (event) => {
    console.log("Order button clicked");
    console.log("Selected value:", event.target.value);
    dispatch(OrderName(event.target.value));
  };
  const handleFilterSource = (event) => {
    event.preventDefault();
    dispatch(FilterBySource(event.target.value));
  };
  const handleFilterDiets = (event) => {
    event.preventDefault();
    dispatch(FilterByDiets(event.target.value));
  };

  return (
    <div className={style.homePage}>
      <NavBar />

      <div className={style.titleCont}>
        {/* <div className={style.title}>
          <h2 className={style.h2Title}>Recipes especially for you:</h2>
        </div> */}

        <div>
          <label>Order by:</label>
          <select onChange={handleOrderByName}>
            <option value="none">No order</option>
            <option value="az">A to Z</option>
            <option value="za">Z to A</option>
            <option value="hd">HealthScore +</option>
            <option value="hu">HealthScore -</option>
          </select>
        </div>

        <div>
          <label>Filter by:</label>
          <select onChange={handleFilterSource}>
            <option value="ALL">All</option>
            <option value="DB">BDD</option>
            <option value="API">API</option>
          </select>

          <select onChange={handleFilterDiets}>
            <option value="ALL">All Diets</option>
            {allDiets.map((dietOp) => (
              <option value={dietOp.name} key={dietOp.id}>
                {dietOp.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* <RecipeList /> */}

      <div className={style.info}>
        <Recipes info={allRecipes} />
      </div>
      {/* <Footer /> */}
        <div className={style.paginate}>
          <label className={style.explore}>Prev...</label>
          <button className={style.button} name="prev" onClick={paginate}>
            ⬅️
          </button>
          <button className={style.button} name="next" onClick={paginate}>
            ➡️
          </button>
          <label className={style.explore}>Next...</label>
        </div>
    </div>
  );
};

export default HomePage;
