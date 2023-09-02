import ApiService from "./ApiService";

const AuthService = {
  register: async (registrationData) => {
    try {
      const response = await ApiService.post("/signup", registrationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService;
