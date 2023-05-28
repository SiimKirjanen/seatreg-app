import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { BORDER_COLOR } from "../../constants";

interface Props {
  title: string;
  apiToken: string;
  siteUrl: string;
}

function Connection({ title, apiToken, siteUrl }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.wrap}>
      <View style={{ flexGrow: 1 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Bookings", {
              apiToken: apiToken,
              siteUrl: siteUrl,
            })
          }
        >
          <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconWrap}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddToken")}
          style={styles.btn}
        >
          <FontAwesome name="gear" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "stretch",
  },
  text: {
    fontSize: 40,
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#ccc",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrap: {
    width: 50,
  },
});

export default Connection;
