import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";

import DateInput from "../components/DateInput";
import ColorPicker from "../components/ColorPicker";

export default function AddReminderScreen() {
  const handleInputChange = (name) => {
    return (value) => {
      setValues({ ...values, [name]: value });
    };
  };

  const [values, setValues] = useState({});

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TextInput
        label="Title"
        style={[styles.input]}
        value={values["title"]}
        onChangeText={handleInputChange("title")}
      />
      <DateInput
        label="Date"
        style={[styles.input]}
        value={values["date"]}
        onChangeText={handleInputChange("date")}
      />
      <TextInput
        label="Description"
        multiline={true}
        numberOfLines={3}
        style={[styles.input]}
        value={values["description"]}
        onChangeText={handleInputChange("description")}
      />
      <TextInput
        label="City"
        style={[styles.input]}
        value={values["city"]}
        onChangeText={handleInputChange("city")}
      />
      <TextInput
        label="Color"
        selectionColor={values["color"]}
        style={[styles.input]}
        value={values["color"]}
        style={{ color: values["color"] }}
        editable={false}
        onChangeText={handleInputChange("color")}
      />
      <ColorPicker
        selectedColor={values["color"]}
        onSelect={handleInputChange("color")}
      />
      <View style={{ marginTop: 30 }}>
        <Button
          icon="content-save"
          mode="contained"
          onPress={() => alert(JSON.stringify(values))}
        >
          Save Reminder
        </Button>
      </View>
    </ScrollView>
  );
}

AddReminderScreen.navigationOptions = {
  title: "New Reminder",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  input: {
    marginBottom: 5,
  },
});
