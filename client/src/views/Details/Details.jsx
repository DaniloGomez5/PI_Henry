/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { cleanDetail, getRecipeDetail } from "../../redux/actions";
import style from "./Details.module.css";

export const Details = () => {
  const dispatch = useDispatch();
  const id = useParams();
  const recipeDetail = useSelector((state) => state.recipeDetails);

  useEffect(() => {
    dispatch(getRecipeDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  const handleHomeClick = () => {
    if (window.location.pathname === "/home") window.location.reload();
  };

  return (
    <div
      className={style.back}
      style={{
        backgroundImage:
          "url(https://th.bing.com/th/id/R.4c36e08c14a7f1acc09d9bb5bf3fef8c?rik=4%2fO7XGMXmsaLfw&pid=ImgRaw&r=0)",
      }}
    >
      <div className={style.titleCont}>
        <h2 className={style.title}>{recipeDetail?.title}</h2>
      </div>

      <h3 className={style.h3}>ID: {recipeDetail?.id}</h3>

      <div className={style.recipeDetail}>
        <div>
          <div className={style.summaryCont}>
            <h3 className={style.h3}>Summary</h3>
            <div className={style.summary}>
              <h3 dangerouslySetInnerHTML={{ __html: recipeDetail?.summary }} />
            </div>
          </div>

          <div className={style.dietsCont}>
            <h3 className={style.h3}>Diets:</h3>
            <ul title="Diets" className={style.customList}>
              {recipeDetail?.diets.map((diet, index) => {
                return <li key={index}>{diet}</li>;
              })}
            </ul>
          </div>
        </div>

        <div className={style.steps}>
          <h3 className={style.h3}>Steps</h3>
          {recipeDetail?.instructions && (
            <ol className={style.customSteps}>
              <div
                dangerouslySetInnerHTML={{ __html: recipeDetail.instructions }}
              />
            </ol>
          )}

          {recipeDetail?.steps && (
            <ol className={style.customSteps}>
              <div dangerouslySetInnerHTML={{ __html: recipeDetail.steps }} />
            </ol>
          )}

          {recipeDetail && (
            <img
              className={style.recipeImage}
              src={recipeDetail.image}
              alt="Recipe"
            />
          )}
        </div>
      </div>

      <NavLink className={style.goHomeImg} to="/home" onClick={handleHomeClick}>
        <div className={style.goback}>⏪</div>
      </NavLink>
    </div>
  );
};
