import React from "react";
import { useSelector } from "react-redux";
import MealList from "../components/MealList";

const CategoryMealScreen = (props) => {
  const selectedCategory = props.navigation.getParam("category");

  const availableMeals = useSelector((state) => state.meals.filteredMeals);
  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(selectedCategory.id) >= 0
  );

  return <MealList meals={displayedMeals} navigation={props.navigation} />;
};

export default CategoryMealScreen;
