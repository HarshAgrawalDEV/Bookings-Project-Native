import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { CalendarList } from "react-native-calendars";
import XDate from "xdate";

const DateRangePicker = ({ initialRange, onSuccess, holidayList }) => {
  const [state, setState] = useState({
    isfromDatePicked: false,
    istoDatePicked: false,
    markedDates: {},
    fromDate: "",
    holidayList: {},
  });

  const onDayPress = (day) => {
    if (
      !state.isfromDatePicked ||
      (state.isfromDatePicked && state.istoDatePicked)
    ) {
      setUpStartMarker(day);
    } else if (!state.istoDatePicked) {
      let markedDates = { ...state.markedDates };
      let [mMarkedDate, range] = setUpMarkedDates(
        state.fromDate,
        day.dateString,
        markedDates
      );

      if (range >= 0) {
        setState({
          ...state,
          isfromDatePicked: true,
          istoDatePicked: true,
          markedDates: mMarkedDate,
        });
        onSuccess(state.fromDate, day.dateString);
      } else {
        setUpStartMarker(day);
      }
    }
  };

  const setUpMarkedDates = (fromDate, toDate, markedDates) => {
    let mFromDate = new XDate(fromDate);
    let mToDate = new XDate(toDate);

    let range = mFromDate.diffDays(mToDate);

    if (range >= 0) {
      if (range == 0) {
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1);
          let dateList = Object.keys;
          state.holidayList;

          let filterList = dateList.filter((d) => d == tempDate);
          if (filterList[0] == tempDate) {
            break;
          } else {
            if (i < range) {
              markedDates[tempDate] = {
                customStyle: {
                  container: {
                    backgroundColor: "#33B1FF",
                    width: "100%",
                  },
                },
              };
            } else {
              markedDates[tempDate] = {
                endingDay: true,
              };
            }
          }
        }
      }
    }
  };

  const setUpStartMarker = (day) => {
    let markedDates = {
      [day.dateString]: { startingDay: true },
    };
  };

  return (
    <View>
      <CalendarList
        horizontal={true}
        hideArrows={false}
        className="h-80"
        theme={{
          calendarBackground: "white",
          selectedDayBackgroundColor: "blue",
          selectedDayTextColor: "white",
          arrowColor: "black",
          monthTextColor: "black",
          textDayFontWeight: 500,
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: 400,
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 12,
        }}
        firstDay={1}
        markingType="custom"
        current={state.fromDate}
        markedDates={state.markedDates}
        onDayPress={(day) => onDayPress(day)}
      />
    </View>
  );
};

export default DateRangePicker;

const styles = StyleSheet.create({});
