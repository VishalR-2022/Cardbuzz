import axios from "axios";
import crypto from "react-native-crypto";

const secretKey = "your_secret_key";

const generateHmacSignature = (message) => {
  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(message);

  const signature = hmac.digest("hex");

  return signature;
};

const ApiService = axios.create({
  baseURL: "https://your-api-base-url.com",
  headers: {
    "Content-Type": "application/json",
  },
});

ApiService.interceptors.request.use((config) => {
  const { signature } = generateHmacSignature(`${config.method} ${config.url}`);
  config.headers["X-Signature"] = signature;
  return config;
});

export default ApiService;
