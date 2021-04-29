import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import BodyText from "./BodyText";

const MealListItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.mealItem}>
      <View>
        <View style={styles.mealRow}>
          <ImageBackground
            source={{ uri: props.item.imageUrl }}
            style={styles.mealImage}
          >
            <BodyText style={styles.title}>{props.item.title}</BodyText>
          </ImageBackground>
        </View>
        <View style={{ ...styles.mealRow, ...styles.mealDetails }}>
          <BodyText style={{ flex: 1, textAlign: "left" }}>
            {props.item.duration}m
          </BodyText>
          <BodyText style={{ flex: 1, textAlign: "center" }}>
            {props.item.complexity.toUpperCase()}
          </BodyText>
          <BodyText style={{ flex: 1, textAlign: "right" }}>
            {props.item.affordability.toUpperCase()}
          </BodyText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
    marginVertical: 10,
    overflow: "hidden"
  },
  mealImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end"
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    textAlign: "center"
  },
  mealRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "85%"
  },
  mealDetails: {
    height: "15%",
    paddingHorizontal: 10,
    alignItems: "center"
  }
});

export default MealListItem;
