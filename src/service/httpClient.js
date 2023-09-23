import axios from "axios";
const {
  SIGNED_HEADERS,
  DEVICE_ID,
  API_ENDPOINT,
} = require("./constants");
const { sign } = require("./signer");
const { verifySign } = require("./utils");
// const { getRefreshToken } = require("./reqs/get_refresh_token");
import uuid from 'react-native-uuid';


const httpClient = axios.create({
  baseURL: `${API_ENDPOINT}`,
});

httpClient.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  config.headers["x-date"] = new Date().toISOString().replace(/.\d+Z$/g, "Z");
  config.headers["x-req-id"] = uuid.v4();
  config.headers["x-device-id"] = DEVICE_ID;

  config.params["ts"] = +new Date();

  if ("signerSecretKey" in config && config.signerSecretKey.length > 0) {
    const x_hmac_tag = sign(
      config,
      config.signerSecretKey,
      SIGNED_HEADERS,
      config.baseURL
    );
    config.headers["x-hmac-tag"] = x_hmac_tag;
    console.log(x_hmac_tag, 'x_hmac_tag')
  }
  return config;
});

httpClient.interceptors.response.use(
  (resp) => {
     console.log(">>>>>>>>>>>>>>>>>>>> resp.headers=", resp.headers);
    // For status code with 2xx
    const x_srv_signature = resp.headers["x-srv-signature"];
    const x_hmac_tag = resp.config.headers["x-hmac-tag"];

    if (
      typeof x_srv_signature === "undefined" ||
      typeof x_hmac_tag === "undefined"
    ) {
      resp.data = {
        status: "FAIL",
        err: {
          msg: "invalid sign",
        },
      };
      return resp;
    }

    try {
      const body = JSON.stringify(resp.data);
      const isVerified = verifySign(x_hmac_tag, body, x_srv_signature);
      if (!isVerified) {
        resp.data = {
          status: "FAIL",
          err: {
            code: 10000,
            msg: "invalid sign",
          },
        };
      }
    } catch (e) {
      console.log(e);
    }

    return resp;
  },
  async (error) => {
    console.log(">>>>>>>>>>>>>>>>>>>>=", error);
    const err = error.response?.data;
    // err={err:{code,msg}}
    if (err?.code == 20010) {
      // make a call to refresh token
      // await getRefreshToken(JWT_TOKENS.refresh);
      // and then call the original req (for which this token expired err came)
    }

    // Status code outside the range of 2xx
    // handle error cases
    return Promise.reject(error);
  }
);

module.exports = { httpClient };