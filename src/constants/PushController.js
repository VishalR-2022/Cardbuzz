import React, { useEffect } from 'react'
import PushNotification from 'react-native-push-notification'
import messaging from "@react-native-firebase/messaging";

export const RemotePushController = () => {
  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log('TOKEN:', token)
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification)

        // process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: '51514589793',
      popInitialNotification: true,
      requestPermissions: true
    })
  }, [])

  return null
}

export const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log(token, 'fcm_token')
      return token;
    } catch (e) {
      console.log(error);
    }
  };