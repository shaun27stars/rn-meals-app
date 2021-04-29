import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import BodyText from "../components/BodyText";
import MealList from "../components/MealList";

const FavouritesScreen = (props) => {
  const favouriteMeals = useSelector((state) => state.meals.favouriteMeals);
  if (favouriteMeals.length === 0) {
    return (
      <View style={styles.noContent}>
        <BodyText>No favourite meals found</BodyText>
      </View>
    );
  } else {
    return <MealList meals={favouriteMeals} navigation={props.navigation} />;
  }
};

const styles = StyleSheet.create({
  noContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default FavouritesScreen;
