import { useItem } from "@my-org/react-api-client/items/use-item";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ScreenParams } from "../navigation";

type Props = NativeStackScreenProps<ScreenParams, "Item">;

const Items = ({ navigation, route }: Props) => {
  const { item, updateItem, deleteItem, isLoading, error } = useItem(
    route.params.id
  );
  const [value, setValue] = useState("");

  useEffect(() => {
    if (item) {
      setValue(item.value);
    }
  }, [setValue, item]);

  const handleUpate = useCallback(() => {
    updateItem({
      value,
    });
  }, [value]);

  const handleDelete = useCallback(async () => {
    await deleteItem();
    navigation.goBack();
  }, [navigation]);

  const handleChangeText = useCallback(
    (text) => {
      setValue(text);
    },
    [setValue]
  );

  return (
    <SafeAreaView>
      <ScrollView>
        {error && <Text>{error.toString()}</Text>}
        <View>
          <TextInput
            style={styles.input}
            onChangeText={handleChangeText}
            value={value}
            editable={!isLoading}
          />
        </View>
        <Button
          onPress={handleUpate}
          title="Update"
          disabled={isLoading}
        ></Button>
        <Button
          onPress={handleDelete}
          title="Delete"
          disabled={isLoading}
        ></Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default Items;
