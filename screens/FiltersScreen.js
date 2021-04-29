import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import Colors from "../constants/colors";

const FiltersSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        value={props.value}
        onValueChange={props.onValueChange}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  const { navigation } = props;
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  // Functions are re-created on component render. Using useCallback() means it'll only be
  // changed (thus triggering the useEffect() condition) if one of it's dependencies changes
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    };

    console.log(appliedFilters);
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  // To pass data to the navigation we have to pass a function here
  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters</Text>
      <FiltersSwitch
        label="Gluten Free"
        value={isGlutenFree}
        onValueChange={(value) => setIsGlutenFree(value)}
      />
      <FiltersSwitch
        label="Lactose Free"
        value={isLactoseFree}
        onValueChange={(value) => setIsLactoseFree(value)}
      />

      <FiltersSwitch
        label="Vegan"
        value={isVegan}
        onValueChange={(value) => setIsVegan(value)}
      />

      <FiltersSwitch
        label="Vegetarian"
        value={isVegetarian}
        onValueChange={(value) => setIsVegetarian(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    padding: 20
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 10
  }
});

export default FiltersScreen;
