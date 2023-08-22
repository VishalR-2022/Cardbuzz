import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

import Home from "./Home";
import History from "./History";
import Profile from "./Profile";

import { ProfileTab, HomeTab, HistoryTab } from "../svg";
import { COLORS } from "../constants/theme";

export default function MainLayout({ route }) {
  const [selectedTab, setSelectedTab] = useState("Home");

  useEffect(() => {
    if (route.params && route.params.selectedTab) {
      setSelectedTab(route.params.selectedTab);
    }
  }, [route.params]);

  const tabs = [
    {
      id: "1",
      screen: "Home",
      icon: <HomeTab strokeColor={selectedTab == "Home" && COLORS.Primary} />,
    },
    {
      id: "2",
      screen: "History",
      icon: (
        <HistoryTab strokeColor={selectedTab == "History" && COLORS.Primary} />
      ),
    },
    {
      id: "3",
      screen: "Profile",
      icon: (
        <ProfileTab strokeColor={selectedTab == "Profile" && COLORS.Primary} />
      ),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      {selectedTab == "Home" && <Home />}
      {selectedTab == "History" && <History />}
      {selectedTab == "Profile" && <Profile />}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 15,
          backgroundColor: COLORS.White,
          borderTopColor: "#EEEEEE",
          borderTopWidth: 1,
          paddingHorizontal: 30,
        }}
      >
        {tabs.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{ alignItems: "center" }}
              onPress={() => setSelectedTab(item.screen)}
            >
              <View style={{ marginBottom: 0 }}>{item.icon}</View>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: selectedTab == item.screen ? "600" : "400",
                  color:
                    selectedTab == item.screen
                      ? COLORS.TextDark
                      : COLORS.TextGray,
                }}
              >
                {item.screen}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
