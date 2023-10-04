import { httpClient } from "../httpClient";
import { encPayload, encKey } from "../utils";
import { DEVICE_ID } from "../constants";
import CryptoJs from 'react-native-crypto-js';

// ----------------------------------------------
// ----------------------------------------------

async function createUser({ country_code, phone }) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    notification_token: "xxxx-yyyyy",
    created_at: new Date().toISOString(),
  };
  const data = encPayload(user);
  
  let key = encKey(data.key);
  const payload = {
    body: data.cipherText,
    token: key,
  };

  console.log(data, '1234567889')
  // send to sever
  const config = {
    method: "post",
    url: `/user`,
    params: {},
    // body: null,
    data: payload,
    signerSecretKey: data.key,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    console.log(e.response.data);
    e = !e; // HANDLE error
  }
}

async function resendSignupOTP({ country_code, phone }, otp_req) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    ...otp_req,
    // ts: new Date().toISOString(),
  };
  const data = encPayload(user);
  // console.log(data);
  let key = encKey(data.key);
  
  // console.log(key);
  const payload = {
    body: data.cipherText,
    token: key,
  };
  console.log(payload);

  // send to sever
  const config = {
    method: "post",
    url: `/otp/resend/register`,
    params: {
      ts: +new Date(),
    },
    // body: null,
    data: payload,
    signerSecretKey: data.key,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }
}

async function verifySignupOTP({ country_code, phone }, otp_req, otp) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    otp: otp,
    ...otp_req,
    // ts: new Date().toISOString(),
  };
  const data = encPayload(user);

  let key = encKey(data.key);

  const payload = {
    body: data.cipherText,
    token: key,
  };

  // send to sever
  const config = {
    method: "post",
    url: `/otp/verify/register`,
    params: {
      ts: +new Date(),
    },
    // body: null,
    data: payload,
    signerSecretKey: data.key,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }
}

//////////////////// NOT USED ///////////////////////
async function createUserAfterOTPVerified(otp_verified) {
  let user = {
    country_code: "91",
    phone: "1111111111",
    device_id: DEVICE_ID,
    ts: new Date().toISOString(),
    ...otp_verified,
  };
  const data = encPayload(user);

  let key = encKey(data.key);

  const payload = {
    body: data.cipherText,
    token: key,
  };

  // send to sever
  const config = {
    method: "post",
    url: `/user/token`,
    params: {
      ts: +new Date(),
    },
    // body: null,
    data: payload,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }
}

module.exports = {
  createUser: createUser,
  resendSignupOTP: resendSignupOTP,
  verifySignupOTP: verifySignupOTP,
};