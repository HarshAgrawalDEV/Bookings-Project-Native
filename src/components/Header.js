import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Header = () => {
  return (
    <View className="bg-[#003580] h-20 items-center justify-around flex-row">
      <Pressable className="flex-row items-center border-2 border-white rounded-3xl p-2 ">
        <Ionicons name="bed-outline" size={24} color="white" />
        <Text className="text-base text-white ml-1 font-medium">Stays</Text>
      </Pressable>

      <Pressable className="flex-row items-center   p-2 ">
        <Ionicons name="ios-airplane-outline" size={26} color="white" />
        <Text className="text-base text-white ml-1 font-medium">Flights</Text>
      </Pressable>

      <Pressable className="flex-row items-center   p-2 ">
        <Ionicons name="car-outline" size={26} color="white" />
        <Text className="text-base text-white ml-1 font-medium">
          Car Rental
        </Text>
      </Pressable>

      <Pressable className="flex-row items-center   p-2 ">
        <FontAwesome5 name="uber" size={26} color="white" />
        <Text className="text-base text-white ml-1 font-medium">Taxi</Text>
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
