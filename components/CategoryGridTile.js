import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";
import BodyText from "./BodyText";

const CategoryGridTile = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridItem}>
      <TouchableCmp
        style={{ flex: 1 }}
        onPress={props.onSelect}
        background={TouchableNativeFeedback.Ripple("", true)}
      >
        <View style={{ ...styles.category, backgroundColor: props.item.color }}>
          <BodyText>{props.item.title}</BodyText>
        </View>
      </TouchableCmp>
    </View>
  );
};

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    elevation: 5
  },
  category: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 15
  }
});
