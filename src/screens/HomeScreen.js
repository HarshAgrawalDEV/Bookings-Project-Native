import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Button,
  Modal,
} from "react-native";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import {
  BottomModal,
  ModalButton,
  ModalContent,
  ModalFooter,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";

function CustomCalendar(props) {
  const initDate = "2022-12-01";
  const [range, setRange] = useState({});

  // Using useMemo to perform calculations only if range is modified
  const marked = useMemo(() => {
    if (!range.startDate) return {};

    let start = new Date(range.startDate).getTime();
    let end = new Date(range.endDate || range.startDate).getTime();
    let marked = {};

    for (let cur = start; cur <= end; cur += 60 * 60 * 24000) {
      let curStr = new Date(cur).toISOString().substring(0, 10);
      marked[curStr] = {
        selected: true,
        color: "#aabbee",
        textColor: "black",
        startingDay: cur == start,
        endingDay: cur == end,
      };
    }
    return marked;
  }, [range]);

  function handleDayPress(day) {
    if (range.startDate && !range.endDate) {
      // startDate is selected. Complete the range selection
      let newRange = { ...range, ...{ endDate: day.dateString } };
      props.onRangeSelected && props.onRangeSelected(newRange);
      setRange(newRange);
    } else {
      // startDate isn't selected. Start the range selection
      setRange({
        startDate: day.dateString,
      });
    }
    // setModal(false);
  }

  return (
    <Calendar
      initialDate={initDate}
      markedDates={marked}
      markingType="period"
      onDayPress={handleDayPress}
      {...props}
    />
  );
}

const HomeScreen = ({ navigation }) => {
  const [modal, setModal] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Booking.com",
      headerTitleStyle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "white",
        marginLeft: 120,
      },

      headerStyle: {
        backgroundColor: "#003580",
        height: 100,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => (
        <View className="mr-5">
          <Ionicons
            name="notifications-outline"
            size={24}
            color="white"
            //   className=" "
          />
        </View>
      ),
    });
  }, []);

  // const handleRange = () => {
  //   navigation.navigate("Main", { fromDate, toDate });
  //   // navigation.goBack();
  // };

  return (
    <>
      <View>
        <Header />
        <ScrollView>
          <View className="m-5 border-[3px] border-[#FFC72C] rounded-md ">
            <Pressable className="flex-row items-center space-x-2 py-2 border-2 border-[#FFc72C] px-4">
              <Feather name="search" size={24} color="black" />
              <TextInput
                placeholderTextColor="black"
                placeholder="Enter your Destination"
              />
            </Pressable>

            {/* <Pressable
            className="flex-row items-center space-x-2 py-2 border-2 border-[#FFc72C] px-4"
            onPress={() => navigation.navigate("DateList")}
          >
            <Feather name="calendar" size={24} color="black" />
            {/* <DatePicker
              style={{
                width: 350,
                height: 30,
                borderRadius: 0,
                borderWidth: 0,
                borderColor: "transparent",
                flexDirection: "row",
              }}
              customStyles={{
                placeholderText: {
                  fontSize: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  // marginRight: "auto",
                },
                headerStyle: {
                  backgroundColor: "#003580",
                },
                contentText: {
                  fontSize: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  // marginRight: "auto",
                },
              }}
              selectedBgColor="#0047AB"
              // customButton={(onConfirm) => customButton(onConfirm)}
              // onConfirm={(startDate, endDate) =>
              //   setSelectedDates(startDate, endDate)
              // }
              allowFontScaling={false}
              placeholder={"Select Your Dates"}
              mode={"range"}
            /> */}
            {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
            {/* <DatePicker date={date} onDateChange={setDate} /> */}
            {/* <DateList /> */}
            {/* <Text>Select Date Range</Text>
          </Pressable>  */}

            <Pressable className="flex-row items-center space-x-2 py-2 border-2 border-[#FFc72C] px-4">
              <Feather
                name="calendar"
                size={24}
                color="black"
                onPress={() => setModal(true)}
              />
              <Text className="font-light">Select Date Range</Text>
            </Pressable>

            {/* <Modal visible={modal} animationType="fade">
            <Calendar
            // onDayPress={(date) => {
            //   console.log(date);
            //   setFromDate(date.dateString);
            //   setCount(1);
            //   // if (date.dateString != fromDate) {
            //   //   setToDate(date.dateString);
            //   //   setCount(2);
            //   // }
            //   console.log(fromDate);
            //   console.log(toDate);
            //   // if (count === 2) {
            //   setModal(false);
            //   // }
            // }}
            />
            <Cla
          </Modal> */}

            <Modal visible={modal} animationType="fade">
              <CustomCalendar
                onRangeSelected={(range) => {
                  console.log("Range selected: ", range);
                  setToDate(range.endDate);
                  setFromDate(range.startDate);
                }}
              />
              <Button
                title="Submit"
                onPress={() => {
                  // navigation.navigate("Home");
                  console.log(fromDate, toDate);
                  setModal(false);
                }}
              />
            </Modal>

            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              className="flex-row items-center space-x-2 py-2 border-2 border-[#FFc72C] px-4"
            >
              <Ionicons
                name="person-outline"
                size={24}
                color="black"
                onPress={() => setModalVisible(!modalVisible)}
              />
              <TextInput
                placeholderTextColor="red"
                placeholder="1 room : 2 adults : 0 child"
              />
            </Pressable>

            <Pressable className="  items-center py-3 border-2 border-[#FFc72C]   bg-[#2a52be]">
              <Text className>Submit</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      <BottomModal
        swipeThreshold={200}
        onBackDropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="Apply"
              className="m-5 bg-[#003580] text-white"
              onPress={() => setModalVisible(!modalVisible)}
              modalTitle={<ModalTitle title="Select rooms and guests" />}
              modalAnimation={
                new SlideAnimation({
                  slideFrom: "bottom",
                })
              }
              onHardwareBackPress={() => setModalVisible(!modalVisible)}
              visible={modalVisible}
              onTouchOutside={() => setModalVisible(!modalVisible)}
            >
              <ModalContent className="w-full h-56">
                <View>
                  <Text>Modals</Text>
                </View>
              </ModalContent>
            </ModalButton>
          </ModalFooter>
        }
      ></BottomModal>
    </>
  );
};

export default HomeScreen;
