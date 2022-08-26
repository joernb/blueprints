import { Options } from "@my-org/react-api-client/provider";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useMemo } from "react";
import Home from "./screens/home";
import Item from "./screens/item";
import Items from "./screens/items";

export type ScreenParams = {
  Home: {};
  List: {};
  Item: {
    id: string;
  };
};

const Tab = createBottomTabNavigator();
const ItemsStack = createNativeStackNavigator<ScreenParams>();

const ItemsStackNavigator = () => (
  <ItemsStack.Navigator>
    <ItemsStack.Screen name="List" component={Items} />
    <ItemsStack.Screen name="Item" component={Item} />
  </ItemsStack.Navigator>
);

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Items" component={ItemsStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
