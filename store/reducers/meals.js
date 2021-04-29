import { MEALS } from "../../data/dummy-data";
import { SET_FILTERS, TOGGLE_FAVOURITE } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favouriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      const favIdx = state.favouriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      const updatedFavMeals = [...state.favouriteMeals];
      if (favIdx >= 0) {
        updatedFavMeals.splice(favIdx, 1);
        return { ...state, favouriteMeals: updatedFavMeals };
      } else {
        const favMeal = state.meals.find((meal) => meal.id === action.mealId);
        updatedFavMeals.push(favMeal);
        return { ...state, favouriteMeals: updatedFavMeals };
      }

    case SET_FILTERS:
      const appliedFilters = action.filters;
      const filteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }
        return true;
      });
      return { ...state, filteredMeals: filteredMeals };
    default:
      break;
  }
  return state;
};

export default mealsReducer;
