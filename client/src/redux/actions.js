/* eslint-disable no-unused-vars */
import axios from "axios";
import { CLEAN_DETAIL, CREATE_RECIPE, FILTERBYDIET, FILTERBYSOURCE, GET_DIETS, GET_RECIPES, GET_RECIPE_BY_ID, GET_RECIPE_BY_NAME, GET_RECIPE_DETAIL, ORDERBYNAME, PAGINATE } from "./action-types";

const API_URL = "http://localhost:3001/";

export const getAllRecipes = () => {
   return async (dispatch) => {
      try {
         const response = await axios.get(API_URL + "allRecipes");
         const recipes = response.data;
         dispatch({
            type: GET_RECIPES,
            payload: recipes,
         });
      } catch (error) {
         console.log(error.message);
      }
   };
};

export const getDiets = () => {
   return async (dispatch) => {
      try {
         const response = await axios.get(`${API_URL}diets`);
         const diets = response.data;
         dispatch({ 
            type: GET_DIETS, 
            payload: diets 
         });
      } catch (error) {
         console.log(error.message);
      }
   };
};

export const page = (direction) => {
   return async (dispatch) => {
      try {
         dispatch({
            type: PAGINATE,
            payload: direction,
         });
      } catch (error) {
         console.log(error.message);
      }
   };
};

export const OrderName = (direction) => {
   return async (dispatch) => {
      try {
         dispatch({
            type: ORDERBYNAME,
            payload: direction,
         });
      } catch (error) {
         console.log(error.message);
      }
   };
};

export const FilterBySource = (source) => {
   return async (dispatch) => {
      try {
         dispatch({
            type: FILTERBYSOURCE,
            payload: source,
         });
      } catch (error) {
         console.log(error.message);
      }
   };
};

export const FilterByDiets = (diet) => {
   return async (dispatch) => {
      try {
         dispatch({
            type: FILTERBYDIET,
            payload: diet,
         });
      } catch (error) {
         console.log(error.message);
      }
   };
};

export const getRecipeDetail = ({ id }) => {
   return async (dispatch) => {
      try {
         if (id === null) {
            dispatch({
               type: GET_RECIPE_DETAIL,
               payload: null,
            });
         }
         const response = await axios.get(`${API_URL}recipes/${id}`);
         const recipe = response.data;
         dispatch({
            type: GET_RECIPE_DETAIL,
            payload: recipe,
         });
      } catch (error) {
         console.log(error.message);
      }
   };
};

export const cleanDetail = () => {
   return {
      type: CLEAN_DETAIL,
      payload: [],
   };
};

export const createRecipe = (recipe) => {
   return async (dispatch) => {
      try {
         const response = await axios.post(`${API_URL}recipes`, recipe);

         dispatch({
            type: CREATE_RECIPE,
            payload: response.data,
         });
      } catch (error) {
         console.log(error.message);
      }
   };
};

export const getRecipesByName = (name) => {
   return async (dispatch) => {
      try {
         const response = await axios.get(`${API_URL}recipes/name?name=${name}`);
         const recipe = response.data;
         if (recipe.length > 0) {
            dispatch({
               type: GET_RECIPE_BY_NAME,
               payload: recipe,
            });
         } else alert("No hay recetas con ese nombre.");
      } catch (error) {
         alert("Error al buscar recetas por nombre.");
      }
   };
};

export const getRecipesbyId = (id) => {
   return async (dispatch) => {
      try {
         const response = await axios.get(`${API_URL}recipes/${id}`);
         const recipe = [response.data];
         dispatch({
            type: GET_RECIPE_BY_ID,
            payload: recipe,
         });
      } catch (error) {
         alert("Error al buscar recetas por ID.");
      }
   };
};

