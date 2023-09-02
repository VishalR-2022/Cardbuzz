import * as Keychain from "react-native-keychain";

export const saveToken = async (token) => {
  try {
    await Keychain.setApiToken("apiToken", "apiKey", token);
    console.log("Token saved successfully");
  } catch (error) {
    console.log("Error saving token:", error);
  }
};

export const retrieveToken = async () => {
  try {
    const credentials = await Keychain.getApiToken("apiToken");
    if (credentials) {
      const token = credentials.password;
      return token;
    } else {
      console.log("No token found");
      return null;
    }
  } catch (error) {
    console.log("Error retrieving token:", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await Keychain.resetApiToken("apiToken");
    return true;
  } catch (error) {
    console.log("Error retrieving token:", error);
    return false;
  }
};
