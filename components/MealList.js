import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import MealListItem from "./MealListItem";

const MealList = (props) => {
  const renderListItem = (itemData) => {
    return (
      <MealListItem
        item={itemData.item}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: {
              meal: itemData.item
            }
          });
        }}
      />
    );
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={props.meals}
        renderItem={renderListItem}
        style={styles.listStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  listStyle: {
    width: "100%",
    paddingHorizontal: 10
  }
});

export default MealList;
