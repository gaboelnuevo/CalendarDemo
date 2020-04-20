import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Platform,
} from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { useReminders } from "../store/reminders";

import { Avatar, Card, IconButton } from "react-native-paper";

import _ from "lodash";
import moment from "moment";

const getWheather = (metadata) => {
  if (metadata && metadata["weather"]) {
    if (metadata["weather"].length) {
      return `(${metadata.weather[0].description})`;
    }
  }

  return null;
};

function Item({ title, date, city, color, meta, removeItem }) {
  const wheather = getWheather(meta);
  return (
    <Card.Title
      title={`${moment(date).format("lll")}, ${title}`}
      subtitle={city + (wheather ? ` ${wheather}`: "")}
      left={(props) => (
        <Avatar.Icon
          {...props}
          theme={{ colors: { primary: color } }}
          icon="calendar"
        />
      )}
      right={(props) => (
        <IconButton
          {...props}
          color={"red"}
          icon="minus-circle"
          onPress={removeItem}
        />
      )}
    />
  );
}

export default function ReminderScreen() {
  const [{ reminders }, actions] = useReminders();
  const sortByDate = (data) =>
    _.sortBy(data, (r) => moment(r.date).toDate().getTime());
  const removeItem = (id) => {
    actions.removeReminder(id);
  };
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      {Platform.OS == "web" ? (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {sortByDate(reminders).map((reminder) => {
            return (
              <Item
                key={reminder.id}
                {...reminder}
                removeItem={() => removeItem(reminder.id)}
              />
            );
          })}
        </ScrollView>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={sortByDate(reminders)}
          renderItem={({ item }) => (
            <Item {...item} removeItem={() => removeItem(item.id)} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <Text
        style={{ textAlign: "center", padding: 5 }}
      >{`Count: ${reminders.length}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    paddingTop: 15,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
