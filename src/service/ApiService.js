import axios from "axios";
import CryptoJS from "react-native-crypto-js"
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import { API_ENDPOINT, DEVICE_ID } from "./constants";
import signer from "./signer";

const secretKey = "your_secret_key";

const generateHmacSignature = async (config) => {
  const { method, url, data, params } = config;

  // Create a sorted list of query parameters
  const queryParams = params
    ? Object.keys(params)
        .sort()
        .map((key) => `${key}=${params[key]}`)
        .join("&")
    : "";

  // Combine method, URL, query parameters, and request body (if present)
  const message = `${method} ${url}?${queryParams}${
    data ? JSON.stringify(data) : ""
  }`;

  JSHmac(
    "message",
    "SecretKey",
    CONSTANTS.HmacAlgorithms.HmacSHA256
  )
    .then((hash) => {
      console.log(hash);
      return hash;
    })
    .catch((e) => console.log(e));

  let hmac_encoded_str = await JSHmac(
    message,
    secretKey,
    CONSTANTS.HmacAlgorithms.HmacSHA256
  );

  CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(hmac_encoded_str));

  return hmac_encoded_str;
};


const ApiService = axios.create({
    baseURL: `${API_ENDPOINT}`,
  });

  ApiService.interceptors.request.use((config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers["x-date"] = new Date().toISOString().replace(/.\d+Z$/g, "Z");
    config.headers["x-req-id"] = crypto.randomUUID();
    config.headers["x-device-id"] = DEVICE_ID;
  
    config.params["ts"] = +new Date();
  
    if ("signerSecretKey" in config && config.signerSecretKey.length > 0) {
      const x_hmac_tag = signer(
        config,
        config.signerSecretKey,
        SIGNED_HEADERS,
        config.baseURL
      );
      config.headers["x-hmac-tag"] = x_hmac_tag;
    }
    return config;
  });

ApiService.interceptors.request.use((config) => {
  const signature = generateHmacSignature(config);
  // config.headers["X-Signature"] = signature;
  return config;
});

export default ApiService;
