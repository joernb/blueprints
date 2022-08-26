import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { ScreenParams } from "../navigation";

type Props = NativeStackScreenProps<ScreenParams, "Home">;

const Home = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
