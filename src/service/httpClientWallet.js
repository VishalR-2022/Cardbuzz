import axios from "axios";
import {
  SIGNED_HEADERS,
  API_WALLET_ENDPOINT,
} from "./constant";
import  { sign } from "./signer";
import uuid from 'react-native-uuid';
import { DEVICE_ID } from "../constants/DeviceInfo";

const httpClientWallet = axios.create({
  baseURL: `${API_WALLET_ENDPOINT}`,
});

httpClientWallet.interceptors.request.use(async (config) => {
  if (
    !config.headers["Content-Type"] ||
    typeof config.headers["Content-Type"] === "undefined"
  ) {
    config.headers["Content-Type"] = "application/json";
  }

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

httpClientWallet.interceptors.response.use(
  (resp) => {
    console.log('>>>>>>>>>>>>>>>>>>>> success');
    return resp;
  },
  async (error) => {
    const err = error?.response?.data;
    if (err.includes(`'code': 20010`)) {
      return 'refetch_access'
    }
    return Promise.reject(error);
  }
);

export default httpClientWallet;