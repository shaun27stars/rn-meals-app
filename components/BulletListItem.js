import React from "react";
import { StyleSheet, View } from "react-native";
import BodyText from "./BodyText";

const BulletListItem = (props) => {
  return (
    <View {...props} style={styles.listItem}>
      <BodyText>{"\u2022" + " "}</BodyText>
      <BodyText>{props.children}</BodyText>
    </View>
  );
};

export default BulletListItem;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    marginVertical: 5
  }
});
