import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import MealsNavigator from "./navigation/MealsNavigator";
import { enableScreens } from "react-native-screens";

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={Platform.OS === "android" ? "light" : "dark"} />
      <MealsNavigator />
    </View>
  );
}
