import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  History,
  Home,
  Profile,
  ResetPin,
  AccountSetting,
  PrivacyPolicy,
  ContactUs,
} from "../screens";
import CustomDrawer from "./CustomDrawer";
import { COLORS } from "../constants/theme";

const Drawer = createDrawerNavigator();

const AppDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#fff",
        drawerActiveTintColor: COLORS.TextDark,
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          fontSize: 15,
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="History" component={History} />
      <Drawer.Screen name="ResetPin" component={ResetPin} />
      <Drawer.Screen name="AccountSetting" component={AccountSetting} />
      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Drawer.Screen name="ContactUs" component={ContactUs} />
    </Drawer.Navigator>
  );
};

export default AppDrawerNavigator;
