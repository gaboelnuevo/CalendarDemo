import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";

import { generate } from "../Util/calendar";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange,
} from "react-native-responsive-screen";

import moment from "moment";

import _ from "lodash";

import { RemindersSubscriber } from "../store/reminders";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getRemindersFromRange = (reminders, startDate, endDate) => {
  return reminders.filter((r) => {
    return moment(r.date).isBetween(moment(startDate), moment(endDate));
  });
};

export default class Calendar extends React.Component {
  componentDidMount() {
    listenOrientationChange(this);
  }

  openDay(dayOfMonth) {
    const date = moment()
      .startOf("month")
      .year(this.props.year)
      .month(this.props.month)
      .add(dayOfMonth - 1, "d");
    window.alert(date.toJSON());
  }

  getReminders(n, reminders) {
    return reminders.filter((r) => {
      return moment(r.date).date() == n;
    });
  }

  generateCalendar() {
    const data = generate(this.props.month, this.props.year);
    const styles = createStyles();
    const screenWidth = Dimensions.get("window").width;
    const smallScreen = screenWidth < 820;
    return (
      <RemindersSubscriber>
        {/* Store state is the first argument and actions are the second one */}
        {(state) => {
          const reminders = getRemindersFromRange(
            state.reminders,
            data.startDate,
            data.endDate
          );
          return (
            <>
              <View style={styles.week}>
                {DAYS.map((day) => {
                  return (
                    <View style={[styles.weekDay]} key={day}>
                      <Text numberOfLines={1} style={[styles.dayText]}>
                        {day}
                      </Text>
                    </View>
                  );
                })}
              </View>
              {data.weeks.map((days, wIndex) => {
                return (
                  <View style={styles.week} key={`w-${wIndex}`}>
                    {days.map((n, index) => {
                      return (
                        <View
                          key={`day${index}`}
                          style={[
                            styles.calendarItem,
                            smallScreen
                              ? {
                                  justifyContent: "center",
                                  alignItems: "center",
                                }
                              : {},
                          ]}
                        >
                          <TouchableOpacity
                            style={{ height: "100%", width: "100%" }}
                            disabled={!n}
                            onPress={() => this.openDay(n)}
                          >
                            <Text
                              style={
                                smallScreen
                                  ? {
                                      textAlign: "center",
                                      flex: 1,
                                      height: "100%",
                                    }
                                  : { padding: 4 }
                              }
                            >
                              {n ? n : ""}
                            </Text>
                            {!smallScreen ? (
                              <View style={styles.remidersContainer}>
                                <View style={{ flex: 1 }}>
                                  {this.getReminders(n, reminders)
                                    .slice(0, 3)
                                    .map((reminder) => {
                                      return (
                                        <Text
                                          numberOfLines={1}
                                          style={[
                                            styles.reminder,
                                            {
                                              backgroundColor: reminder.color,
                                            },
                                          ]}
                                        >
                                          {"9:00am " + reminder.title}
                                        </Text>
                                      );
                                    })}
                                </View>
                              </View>
                            ) : (
                              <View
                                style={{
                                  flexDirection: "row",
                                  flex: 1,
                                  justifyContent: "center",
                                }}
                              >
                                {this.getReminders(n, reminders)
                                  .slice(0, 3)
                                  .map((reminder) => {
                                    return (
                                      <View
                                        style={[
                                          styles.smallCircle,
                                          {
                                            backgroundColor: reminder.color,
                                          },
                                        ]}
                                      />
                                    );
                                  })}
                              </View>
                            )}
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </>
          );
        }}
      </RemindersSubscriber>
    );
  }

  render() {
    const styles = createStyles();
    return (
      <View style={styles.container}>
        <View>{this.generateCalendar()}</View>
      </View>
    );
  }
}

const createStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: "transparent",
    },
    week: {
      flexDirection: "row",
      flex: 1,
    },
    dayText: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
    },
    weekDay: {
      flex: 1,
      padding: 5,
      borderColor: "#4679A2",
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: "#88AEDD",
      margin: 2,
    },
    calendarItem: {
      flex: 1,
      height: wp("8%"),
      maxHeight: hp("12%"),
      overflow: "hidden",
      borderColor: "#4679A2",
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: "#fafafa",
      margin: 2,
    },
    reminder: {
      fontSize: 10,
      height: 18,
      color: "white",
      padding: 4,
      marginLeft: 6,
      margin: 2,
      borderRadius: 4,
    },
    remidersContainer: {
      maxHeight: "95%",
      maxWidth: "92%",
      width: "92%",
      paddingHorizontal: 5,
      flex: 1,
      paddingTop: 2,
      position: "absolute",
      left: 14,
    },
    smallCircle: {
      height: 5,
      width: 5,
      margin: 2,
      borderRadius: 5,
    },
  });
};
