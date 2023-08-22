import React from "react";
import { Provider } from "react-redux";
import store from "./src/store/store"; // Import the store
import AppNavigator from "./src/navigation/AppNavigator"; // Import the AppNavigator
import { NavigationContainer } from "@react-navigation/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const App = () => {
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
