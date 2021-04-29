import React from "react";
import MealList from "../components/MealList";

import { MEALS } from "../data/dummy-data";

const CategoryMealScreen = (props) => {
  const selectedCategory = props.navigation.getParam("category");

  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(selectedCategory.id) >= 0
  );

  return <MealList meals={displayedMeals} navigation={props.navigation} />;
};

export default CategoryMealScreen;
