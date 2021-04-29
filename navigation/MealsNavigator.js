import React from "react";
import { Text, Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import Colors from "../constants/colors";
import FiltersScreen from "../screens/FiltersScreen";
import HeaderButton from "../components/HeaderButton";

const headerStyles = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "white"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  }
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: (navData) => {
        return {
          headerTitle: "Meal Categories",
          headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          )
        };
      }
    },
    CategoryMeals: {
      // longer form optional for passing additional options
      screen: CategoryMealsScreen,

      navigationOptions: (navigationData) => {
        const cat = navigationData.navigation.getParam("category");
        return {
          headerTitle: cat.title,
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? cat.color : "white"
          },
          headerTintColor: Platform.OS === "android" ? "white" : cat.color,
          headerBackTitle: "Categories"
        };
      }
    },
    MealDetail: MealDetailScreen
  },
  {
    defaultNavigationOptions: headerStyles
  }
);

const FavsNavigator = createStackNavigator(
  {
    Favourites: {
      screen: FavouritesScreen,
      navigationOptions: (navData) => {
        return {
          headerTitle: "Favourites",
          headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          )
        };
      }
    },
    MealDetail: MealDetailScreen
  },
  {
    defaultNavigationOptions: headerStyles
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarLabel: "All Meals",
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      // sets colour for material tabs only if shifting is true and this tab is active
      tabBarColor: Colors.primaryColor,
      // Workaround. Using the Material Tab (below) does not support label settings, but the text
      // can be set to a component and styled accordingly. This loses the default styling below,
      // including colour, so we're only using it on android where it's white and not breaking ios
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans" }}>Meals</Text>
        ) : (
          "Meals"
        )
    }
  },
  Favourites: {
    screen: FavsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      // sets colour for material tabs only if shifting is true and this tab is active
      tabBarColor: Colors.secondaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans" }}>Favourites</Text>
        ) : (
          "Favourites"
        )
    }
  }
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "white",
        shifting: true,
        // bar style sets background if shifting is false
        barStyle: {
          backgroundColor: Colors.primaryColor
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.secondaryColor,
          labelStyle: {
            fontFamily: "open-sans"
          }
        }
      });

const FiltersNavigator = createStackNavigator(
  {
    Filters: {
      screen: FiltersScreen,
      navigationOptions: (navData) => {
        return {
          headerTitle: "Filters",
          headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Save"
                iconName="ios-save"
                onPress={() => {
                  navData.navigation.getParam("save")();
                }}
              />
            </HeaderButtons>
          )
        };
      }
    }
  },
  { defaultNavigationOptions: headerStyles }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals"
      }
    },
    Filters: {
      screen: FiltersNavigator,
      navigationOptions: {
        drawerLabel: "Filters"
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: Colors.secondaryColor,
      labelStyle: {
        fontFamily: "open-sans-bold"
      }
    }
  }
);

export default createAppContainer(MainNavigator);
