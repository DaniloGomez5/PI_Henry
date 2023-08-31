import { CLEAN_DETAIL, CREATE_RECIPE, FILTERBYDIET, FILTERBYSOURCE, GET_DIETS, GET_RECIPES, GET_RECIPE_BY_ID, GET_RECIPE_BY_NAME, GET_RECIPE_DETAIL, ORDERBYNAME, PAGINATE, SEARCH_RECIPE } from "./action-types";

const initialState = {
  allHomeRecipes: [],
  allHomeRecipesCopy: [],
  dietTypes: [],
  recipeDetails: null,
  recipesFiltered: [],
  sourceFilter: "ALL",
  currentPage: 0,
};

const reducer = (state = initialState, action) => {
  const ITEMS_PAGE = 9;
  switch (action.type) {
    case GET_RECIPES:
      if (!state.allHomeRecipes.lenght) {
        return {
          ...state,
          allHomeRecipes: [...action.payload].splice(0, ITEMS_PAGE),
          allHomeRecipesCopy: action.payload,
          recipesFiltered: action.payload,
        };
      }
      return {
        ...state,
        allHomeRecipes: [...state.recipesFiltered].splice(ITEMS_PAGE),
      };

    case GET_DIETS:
      return {
        ...state,
        dietTypes: action.payload,
      };

    case PAGINATE:
      const nextPage = state.currentPage + 1;
      const prevPage = state.currentPage - 1;
      const newIndex = action.payload === "next" ? nextPage : prevPage;
      if (
        (action.payload === "next" &&
          newIndex * ITEMS_PAGE >= state.recipesFiltered.length) ||
        (action.payload === "prev" && newIndex < 0)
      ) {
        return { ...state };
      }
      const firstIndex = newIndex * ITEMS_PAGE;
      const paginatedRecipes = state.recipesFiltered.slice(
        firstIndex,
        firstIndex + ITEMS_PAGE
      );
      return {
        ...state,
        allHomeRecipes: paginatedRecipes,
        currentPage: newIndex,
      };

    case ORDERBYNAME:
      let orderFunction;
      let recipesCopy = [...state.recipesFiltered];
      switch (action.payload) {
        case "az":
          orderFunction = (prev, next) => prev.title.localeCompare(next.title);
          break;
        case "za":
          orderFunction = (prev, next) => next.title.localeCompare(prev.title);
          break;
        case "hu":
          orderFunction = (prev, next) => prev.healthScore - next.healthScore;
          break;
        case "hd":
          orderFunction = (prev, next) => next.healthScore - prev.healthScore;
          break;
        case "none":
          return {
            ...state,
            allHomeRecipes: state.allHomeRecipesCopy.slice(0, ITEMS_PAGE),
          };
        default:
          return state;
      }
      const allRecipesOrder = [...recipesCopy].sort(orderFunction);
      return {
        ...state,
        allHomeRecipes: allRecipesOrder.slice(0, ITEMS_PAGE),
        recipesFiltered: allRecipesOrder,
        currentPage: 0,
      };

    case FILTERBYSOURCE:
      let filterRecipes;
      if (action.payload === "ALL") {
        filterRecipes = state.allHomeRecipesCopy;
      } else {
        filterRecipes = state.recipesFiltered.filter((recipe) => {
          return (
            (action.payload === "API" && !isNaN(recipe.id)) ||
            (action.payload !== "API" && isNaN(recipe.id))
          );
        });
      }
      return {
        ...state,
        allHomeRecipes: filterRecipes.slice(0, ITEMS_PAGE),
        sourceFilter: action.payload,
      };

    case FILTERBYDIET:
      let filterDiets;
      if (action.payload === "ALL") {
        filterDiets = [...state.allHomeRecipesCopy];
      } else {
        filterDiets = state.recipesFiltered.filter((recipe) => {
          if (recipe.diets.length) {
            return recipe.diets.includes(action.payload);
          } else {
            return recipe.diets === action.payload;
          }
        });
      }
      return {
        ...state,
        allHomeRecipes: filterDiets.slice(0, ITEMS_PAGE),
      };

    case GET_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetails: action.payload,
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        recipe: [],
      };

    case CREATE_RECIPE:
      return {
        ...state,
        allHomeRecipes: [],
      };

    case SEARCH_RECIPE:
      return {
        ...state,
        recipe: action.payload,
      };

    case GET_RECIPE_BY_ID:
      return {
        ...state,
        allHomeRecipes: action.payload,
      };

    case GET_RECIPE_BY_NAME:
      console.log(action.payload);
      return {
        ...state,
        filterRecipes: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
