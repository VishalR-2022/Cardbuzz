import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./src/store/store"; // Import the store
import AppNavigator from "./src/navigation/AppNavigator"; // Import the AppNavigator
import { NavigationContainer } from "@react-navigation/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { loadServerPubKey } from "./src/service/utils";
import EncryptedStorage from "react-native-encrypted-storage";
import uuid from "react-native-uuid";
import messaging from '@react-native-firebase/messaging';
import { getFCMToken } from "./src/constants/PushController";

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

  useEffect(() => {
    getFCMToken()
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
        }
      });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
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
