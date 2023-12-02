import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./src/store/store"; // Import the store
import AppNavigator from "./src/navigation/AppNavigator"; // Import the AppNavigator
import { NavigationContainer } from "@react-navigation/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { loadServerPubKey } from "./src/service/utils";
import EncryptedStorage from "react-native-encrypted-storage";
import uuid from "react-native-uuid";

const App = () => {
  const getDeviceID = async () => {
    const deviceId = await EncryptedStorage.getItem("device_id");
    console.log(deviceId, "deviceId");
    if (!deviceId) {
      console.log("deviceId created");
      await EncryptedStorage.setItem("device_id", uuid.v4());
    }
    return;
  };

  useEffect(() => {
    loadServerPubKey();
    getDeviceID();
  }, []);

  return (
    <ActionSheetProvider>
      <NavigationContainer>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </NavigationContainer>
    </ActionSheetProvider>
  );
};

export default App;
