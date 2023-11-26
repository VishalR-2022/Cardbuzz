import * as Keychain from "react-native-keychain";

export const saveToken = async (token) => {
  try {
    await Keychain.setApiToken("apiToken", "apiKey", token);
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
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const removeToken = async () => {
  try {
    await Keychain.resetApiToken("apiToken");
    return true;
  } catch (error) {
    return false;
  }
};
