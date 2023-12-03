import axios from "axios";
const {
  SIGNED_HEADERS,
  API_ENDPOINT,
  JWT_TOKENS,
} = require("./constant");
const { sign } = require("./signer");
import uuid from 'react-native-uuid';
import { DEVICE_ID } from "../constants/DeviceInfo";

const httpClient = axios.create({
  baseURL: `${API_ENDPOINT}`,
});

httpClient.interceptors.request.use(async (config) => {
  if (
    !config.headers["Content-Type"] ||
    typeof config.headers["Content-Type"] === "undefined"
  ) {
    config.headers["Content-Type"] = "application/json";
  }
  // console.log(
  //   ">>>>>>>>>>>>>>>>>>>> config.headers=",
  //   Buffer.byteLength(JSON.stringify(config.data))
  // );

  config.headers["x-date"] = new Date().toISOString().replace(/.\d+Z$/g, "Z");
  config.headers["x-req-id"] = uuid.v4();
  config.headers["x-device-id"] = await DEVICE_ID();
  config.headers["Accept"] = "application/json";

  config.params["ts"] = +new Date();

  if ("signerSecretKey" in config && config.signerSecretKey.length > 0) {
    const x_hmac_tag = sign(
      config,
      config.signerSecretKey,
      SIGNED_HEADERS,
      config.baseURL,
      "skipBodyHash" in config ? config.skipBodyHash : false
    );
    config.headers["x-hmac-tag"] = x_hmac_tag;
  }
  return config;
});

httpClient.interceptors.response.use(
  (resp) => {
    // console.log(resp, 'resp')
    return resp;
  },
  async (error) => {
    const err = error.response;
    // console.log(error.response, 'error: https');
    if (err?.code == 20010) {
      // 401
    }

    return Promise.reject(error);
  }
);

module.exports = { httpClient };