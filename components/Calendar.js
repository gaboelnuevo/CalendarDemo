import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { generate } from "../Util/calendar";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default class Calendar extends React.Component {
  generateCalendar() {
    const data = generate(this.props.month, this.props.year);
    return (
      <>
        <View style={styles.week}>
          {DAYS.map((day) => {
            return (
              <View style={[styles.weekDay]} key={day}>
                <Text style={[styles.dayText]}>{day}</Text>
              </View>
            );
          })}
        </View>
        {data.weeks.map((days, wIndex) => {
          return (
            <View style={styles.week} key={`w-${wIndex}`}>
              {days.map((n, index) => {
                return (
                  <View key={`day${index}`} style={styles.calendarItem}>
                    <Text style={{ padding: 4 }}>{n ? n : ""}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View>{this.generateCalendar()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#88AEDD",
  },
  week: {
    flexDirection: "row",
    flex: 1,
  },
  dayText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  weekDay: {
    flex: 1,
    padding: 5,
    backgroundColor: "#4679A2",
    margin: 5,
  },
  calendarItem: {
    flex: 1,
    height: wp("7%"),
    backgroundColor: "#e0edff",
    margin: 5,
  },
});
