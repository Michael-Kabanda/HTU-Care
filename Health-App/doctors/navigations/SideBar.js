import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from "./BottomTab";
import Signout from "../pages/Signout";
import Updates from '../pages/Updates';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const [username, setUsername] = useState("Loading");
  const [email, setEmail] = useState("Loading");

  //Users data callback API
  useEffect(() => {
    async function fetchData() {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://localhost:4000/", {
        headers: new Headers({
          Authorization: "Bearer " + token,
        }),
      });
      const data = await response.json();
      console.log(data);
      setUsername(data.username);
      setEmail(data.email);
    }
    fetchData();
  }, []);

  //Logout Logic Here
  const Signout = async (props) => {
    await AsyncStorage.removeItem("token").then(() => {
      props.navigation.replace("Login");
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Image Profile View */}
      <View
        style={{
          height: 160,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Image container and User name Appearance */}
        <View
          style={{
            borderBottomColor: "#6b7280",
            borderBottomWidth: 1,
            flexDirection: "row",
            paddingBottom: 10,
            alignItems: "center",
            marginBottom: -35,
          }}
        >
          <Image
            style={{
              marginBottom: 5,
              height: 65,
              width: 65,
            }}
            source={require("../../assets/images/account.png")}
          />
        </View>
      </View>

      <ScrollView
        style={{
          marginLeft: 5,
        }}
      >
        {/* Users details callback */}
        <View>
          <Text
            style={{
              justifyContent: "center",
              fontSize: 17,
              fontWeight: "bold",
              marginBottom: 5,
              textAlign: "center",
              color: "#333",
            }}
          >
            {username}
          </Text>
          <Text
            style={{
              justifyContent: "center",
              fontSize: 13,
              fontWeight: "normal",
              marginBottom: 20,
              textAlign: "center",
              color: "#9CA3AF",
            }}
          >
            {email}
          </Text>
        </View>

        {/* Home Tab */}
        <TouchableOpacity
          style={{
            marginTop: 25,
            flexDirection: "row",
            marginBottom: 15,
            marginLeft: 20,
            alignItems: "center",
          }}
          onPress={() => props.navigation.navigate("Menu")}
        >
          <Image
            style={{
              width: 40,
              height: 40,
              marginLeft: 20,
            }}
            source={require("../../assets/images/Dashboard.png")}
            resizeMode="contain"
          />
          <Text
            style={{
              marginLeft: 20,
              fontSize: 17,
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Dashboard
          </Text>
        </TouchableOpacity>

        {/* Profile Update */}
        <TouchableOpacity
          style={{
            marginTop: 10,
            flexDirection: "row",
            marginBottom: 15,
            marginLeft: 20,
            alignItems: "center",
          }}
          onPress={() => props.navigation.navigate("Updates")}
        >
          <Image
            style={{
              width: 35,
              height: 35,
              marginLeft: 20,
            }}
            source={require("../../assets/images/update.png")}
            resizeMode="contain"
          />
          <Text
            style={{
              marginLeft: 20,
              fontSize: 17,
              color: "#333",
              fontWeight: "bold",
            }}
          >
             Profile Update
          </Text>
        </TouchableOpacity>


      </ScrollView>

      {/* Logout Tab */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginBottom: 90,
          marginLeft: 20,
          alignItems: "center",
        }}
        onPress={() => {
          Alert.alert(
            "Signout",
            "Are you sure you want to sign out?",
            [
              {
                text: "No",
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: () => {
                  Signout(props);
                },
              },
            ],
            { cancelable: false }
          );
        }}
      >
        <Image
          style={{ width: 35, height: 35, marginLeft: 25 }}
          source={require("../../assets/images/logout.png")}
          resizeMode="contain"
        />
        <Text
          style={{
            marginLeft: 20,
            fontSize: 17,
            color: "#333",
            fontWeight: "bold",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const SideBar = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => CustomDrawerContent(props)}
      initialRouteName="Menu"
    >
      <Drawer.Screen
        name="Menu"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
       <Drawer.Screen
        name="Updates"
        component={Updates}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Signout"
        component={Signout}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default SideBar;
