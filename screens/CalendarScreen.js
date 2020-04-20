import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import Calendar from "../components/Calendar";
import { CURRENT_MONTH, CURRENT_YEAR } from "../Util/calendar";
import { Button } from "react-native-paper";

import { useReminders } from "../store/reminders";

export default function CalendarScreen({ navigation }) {
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR.toString());
  const [selectedMonth, setSelectedMonth] = useState(CURRENT_MONTH.toString());
  const [{ reminders }] = useReminders();
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            maxWidth: 400,
            flexDirection: "row",
            paddingHorizontal: 15,
            alignSelf: "flex-end",
          }}
        >
          <View style={{ flex: 1, marginRight: 5, paddingVertical: 2 }}>
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedMonth(itemValue)
              }
            >
              <Picker.Item label="January" value={"0"} />
              <Picker.Item label="February" value={"1"} />
              <Picker.Item label="March" value={"2"} />
              <Picker.Item label="April" value={"3"} />
              <Picker.Item label="May" value={"4"} />
              <Picker.Item label="June" value={"5"} />
              <Picker.Item label="July" value={"6"} />
              <Picker.Item label="August" value={"7"} />
              <Picker.Item label="September" value={"8"} />
              <Picker.Item label="October" value={"9"} />
              <Picker.Item label="November" value={"10"} />
              <Picker.Item label="December" value={"11"} />
            </Picker>
          </View>
          <View style={{ flex: 1, marginRight: 5, paddingVertical: 2 }}>
            <Picker
              selectedValue={selectedYear}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedYear(itemValue)
              }
            >
              <Picker.Item label="2019" value="2019" />
              <Picker.Item label="2020" value="2020" />
              <Picker.Item label="2021" value="2021" />
            </Picker>
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Calendar month={selectedMonth} year={selectedYear} />
      </ScrollView>
      <View style={{ padding: 5 }}>
        <Button
          icon="bell-plus"
          mode="text"
          onPress={() => navigation.navigate("AddReminder")}
        >
          Add Reminder
        </Button>
      </View>
    </>
  );
}

CalendarScreen.navigationOptions = {
  title: "Calendar",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {},
});
