import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";

import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

const CategoriesScreen = (props) => {
  const filteredCategoryIds = useSelector((state) =>
    state.meals.filteredMeals.flatMap((meal) => meal.categoryIds)
  );
  const filteredCategories = CATEGORIES.filter(
    (cat) => filteredCategoryIds.indexOf(cat.id) >= 0
  );

  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        item={itemData.item}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "CategoryMeals",
            params: {
              category: itemData.item
            }
          });
        }}
      />
    );
  };

  return (
    <FlatList
      data={filteredCategories}
      numColumns={2}
      renderItem={renderGridItem}
    />
  );
};

export default CategoriesScreen;
