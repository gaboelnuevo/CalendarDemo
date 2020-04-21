import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  InteractionManager,
} from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";

import DateInput from "../components/DateInput";
import ColorPicker from "../components/ColorPicker";
import { Platform } from "react-native";

import { useReminders } from "../store/reminders";

export default function AddReminderScreen({ navigation }) {
  const handleInputChange = (name) => {
    return (value) => {
      setValues({ ...values, [name]: value });
    };
  };

  const [isSaving, setIssaving] = useState(false);
  const [values, setValues] = useState({});
  const [, actions] = useReminders();

  const promptError = (message) => {
    if (Platform.OS == "web") {
      return alert(message);
    }
    Alert.alert("Invalid Form!", message);
  };

  const save = async (values) => {
    const appid = "27a3e6a3b704892ee586f5284872bf80";
    try {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${values.city}&appid=${appid}`
      )
        .then(function (response) {
          return response.json();
        })
        .catch(() => {
          setIssaving(false);
          return null;
        });

      if (data && data.cod != "404") {
        values.meta = data;
        requestAnimationFrame(() => {
          actions.addReminder(values);
        });
        InteractionManager.runAfterInteractions(() => {
          requestAnimationFrame(() => {
            setValues({});
            if (!Platform.OS == "web") {
              navigation.goBack();
            } else {
              navigation.navigate("Root");
            }
          });
        });
      } else {
        setIssaving(false);
        alert("Invalid city!");
      }
    } catch (_err) {
      console.error(_err);
    }
  };

  const handleSubmit = () => {
    if (!values.title) return promptError("Title required!");
    if (!values.date) return promptError("Date required!");
    if (!values.description) return promptError("Description required!");
    if (!values.color) return promptError("Color required!");
    if (!values.city) return promptError("City required!");

    setIssaving(true);
    save(values);
  };

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
      {/*       <TextInput
        label="Color"
        selectionColor={values["color"]}
        style={[styles.input]}
        value={values["color"]}
        style={{ color: values["color"] }}
        editable={false}
        onChangeText={handleInputChange("color")}
      /> */}
      <ColorPicker
        key={"color"}
        selectedColor={values["color"]}
        onSelect={handleInputChange("color")}
      />
      <View style={{ marginTop: 30 }}>
        <Button
          disabled={isSaving}
          icon="content-save"
          mode="contained"
          onPress={() => handleSubmit()}
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
