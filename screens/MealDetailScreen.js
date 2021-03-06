import React, { useEffect, useCallback } from "react";
import { ScrollView, View, Image, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import BodyText from "../components/BodyText";
import BulletListItem from "../components/BulletListItem";
import { toggleFavourite } from "../store/actions/meals";
import Colors from "../constants/colors";

const MealDetailsScreen = (props) => {
  const meal = props.navigation.getParam("meal");
  const mealIsFavourite = useSelector((state) =>
    state.meals.favouriteMeals.some((currMeal) => currMeal === meal)
  );

  const dispatch = useDispatch();

  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(meal.id));
  }, [dispatch, meal]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavouriteHandler });
  }, [toggleFavouriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ mealIsFavourite: mealIsFavourite });
  }, [mealIsFavourite]);

  const filterView = (text) => {
    return (
      <View style={styles.inlineFilter}>
        <Ionicons name="checkmark-circle-outline" color="green" size={24} />
        <BodyText>{text}</BodyText>
      </View>
    );
    // <Ionicons name="md-arrow-up" size={24} color="white" />
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Image source={{ uri: meal.imageUrl }} style={styles.mealImage} />
        <View style={styles.mealRow}>
          <BodyText style={{ color: meal.colorForDuration() }}>
            {meal.duration}m
          </BodyText>
          <BodyText style={{ color: meal.colorForComplexity() }}>
            {meal.complexity.toUpperCase()}
          </BodyText>
          <BodyText style={{ color: meal.colorForAffordability() }}>
            {meal.affordability.toUpperCase()}
          </BodyText>
        </View>
        <View style={styles.mealRow}>
          {meal.isGlutenFree && filterView("Gluten Free")}
          {meal.isVegan && filterView("Vegan")}
          {meal.isVegetarian && filterView("Vegetarian")}
          {meal.isLactoseFree && filterView("Lactose Free")}
        </View>
        <View style={styles.listItems}>
          <BodyText style={styles.boldText}>Ingredients</BodyText>
          {meal.ingredients.map((ing, idx) => (
            <BulletListItem key={idx}>{ing}</BulletListItem>
          ))}
        </View>
        <View style={styles.listItems}>
          <BodyText style={styles.boldText}>Steps</BodyText>
          {meal.steps.map((step, idx) => (
            <BulletListItem key={idx}>{step}</BulletListItem>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

MealDetailsScreen.navigationOptions = (navigationData) => {
  const meal = navigationData.navigation.getParam("meal");
  const toggleFavouriteHandler = navigationData.navigation.getParam(
    "toggleFav"
  );
  const mealIsFavourite = navigationData.navigation.getParam("mealIsFavourite");

  const itemProps = {
    title: "Favourite",
    iconName: "ios-star-outline"
  };
  if (mealIsFavourite) {
    itemProps.color = Colors.secondaryColor;
    itemProps.iconName = "ios-star";
  }

  return {
    headerTitle: meal.title,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item {...itemProps} onPress={toggleFavouriteHandler} />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
    // padding: 20
  },
  mealImage: {
    width: "100%",
    height: 170
  },
  boldText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginBottom: 5
  },
  listItems: {
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  mealRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    // height: 30,
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignContent: "center"
  },
  inlineFilter: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    width: 115
  }
});

export default MealDetailsScreen;
