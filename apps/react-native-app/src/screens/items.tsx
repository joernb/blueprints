import { useItems } from "@my-org/react-api-client/items/use-items";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback } from "react";
import {
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScreenParams } from "../navigation";

type Props = NativeStackScreenProps<ScreenParams, "Items">;

const getItemId = (item) => item.id;

const Items = ({ navigation }: Props) => {
  const { items, createItem, isLoading, error } = useItems();

  const renderItem = useCallback(
    ({ item }) => (
      <Pressable onPress={() => handleSelectItem(item)}>
        <Text style={styles.item}>{item.value}</Text>
      </Pressable>
    ),
    []
  );

  const handleSelectItem = useCallback(
    (item) => {
      navigation.push("Item", { id: item.id });
    },
    [navigation]
  );

  const handleCreateItem = useCallback(() => {
    createItem({
      value: "New",
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
        }}
      >
        {error && <Text>{error.toString()}</Text>}
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={getItemId}
        />
        <Button
          onPress={handleCreateItem}
          disabled={isLoading}
          title="Create"
        ></Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
  },
});

export default Items;
