import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigation from "./src/navigation/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { ModalPortal } from "react-native-modals";

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation />
      <ModalPortal />
    </NavigationContainer>
  );
}
