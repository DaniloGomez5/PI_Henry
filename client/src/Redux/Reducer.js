import { FILTER_BY_DIET, FILTER_BY_ORIGIN } from './Actions';

const initialState = {
  recipes: [],
  filteredRecipes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY_DIET:
      return {
        ...state,
        filteredRecipes: state.recipes.filter(
          (recipe) => recipe.diet === action.diet
        ),
      };
    case FILTER_BY_ORIGIN:
      const isApiRecipe = (recipe) => recipe.origin === 'API';
      const isMyRecipe = (recipe) => recipe.origin === 'MyDB';

      if (action.origin === 'API') {
        return {
          ...state,
          filteredRecipes: state.recipes.filter(isApiRecipe),
        };
      } else if (action.origin === 'MyDB') {
        return {
          ...state,
          filteredRecipes: state.recipes.filter(isMyRecipe),
        };
      } else {
        return {
          ...state,
          filteredRecipes: state.recipes,
        };
      }
    default:
      return state;
  }
};

export default reducer;
