import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View, Platform } from "react-native";

import { Button } from "react-native";

import React, { useState } from "react";

import DisableKeyboard from "./DisableKeyboard";

import { TextInput } from "react-native-paper";

import moment from "moment";

export default function MyDatePicker(props) {
  const [selectedDate, setSelectedDate] = useState(props.value);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
    if (props.onChangeText) {
      props.onChangeText(date);
    }
  };

  return (
    <>
      <DisableKeyboard onPress={showDatePicker}>
        <TextInput
          label={props.label}
          style={props.style}
          editable={false}
          onFocus={() => {
            showDatePicker();
          }}
          onChangeText={() => {}}
          value={
            selectedDate
              ? moment(selectedDate).format("DD/MM/YYYY h:mm a")
              : undefined
          }
        />
      </DisableKeyboard>
      <DateTimePickerModal
        headerTextIOS={props.placeholder || props.label}
        date={selectedDate}
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
}
