import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Platform } from "react-native";

import { TextInput } from "react-native-paper";

import React, { useState } from "react";

const MyDatePicker = (props) => {
    const [selectedDate, setSelectedDate] = useState(props.value);
  
    const Input = ({ value, onChange, onClick }) => (
      <TextInput
        value={value}
        label={props.label}
        onFocus={onClick}
        onChangeText={() => onClick()}
        style={props.style}
      />
    );
  
    return (
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          if (props.onChangeText) {
            props.onChangeText(date);
          }
        }}
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeInput={true}
        customInput={<Input />}
      />
    );
  };

  export default MyDatePicker;