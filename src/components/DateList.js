import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DateRangePicker from "./DateRangePicker";

const DateList = ({ navigation }) => {
  const [state, setState] = useState({ fromDate: "", endDate: "" });
  const [list, setList] = useState([]);

  return (
    <View>
      <DateRangePicker
        onSuccess={(start, end) => {
          setState({
            ...state,
            fromDate: start,
            endDate: end,
          });
        }}
        holidayList={list}
      />
      <Pressable onPress={() => navigation.navigate("Home", state)}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
};

export default DateList;

const styles = StyleSheet.create({});
