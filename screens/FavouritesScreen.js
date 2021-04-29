import React from "react";
import MealList from "../components/MealList";
import { MEALS } from "../data/dummy-data";

const FavouritesScreen = (props) => {
  const favouriteMeals = MEALS.filter(
    (meal) => ["m1", "m2"].indexOf(meal.id) >= 0
  );
  return <MealList meals={favouriteMeals} navigation={props.navigation} />;
};

export default FavouritesScreen;
