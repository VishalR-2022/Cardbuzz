import { DEVICE_ID, PUBLIC_KEY } from "../constant";
import { httpClient } from "../httpClient";
const { encPayload, encKey, getSharedKeyDecoded } = require("../utils");
import XCrypto from "../XCryptoModule";

async function createUser({ country_code, phone }) {
  await XCrypto.loadRSAKey(PUBLIC_KEY);

  const user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    fcm_reg_token: "xxx2x-yyyyy",
  };

  const data = await encPayload(user);
  console.log(data, "data");
  const key = await encKey(data.key);

  const payload = {
    body: data.cipherText,
    token: key,
  };

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
    return res.data;
  } catch (e) {
    console.log(e);
    e = !e;
  }
}

async function verifySignupOTP({ country_code, phone }, access_token, otp) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    otp: otp,
    fcm_reg_token: "xxx2x-yyyyy",
  };

  const data = await encPayload(user);

  const key = await encKey(data.key);

  const payload = {
    body: data.cipherText,
    token: key,
  };

  // send to sever
  const config = {
    method: "post",
    url: `/otp/verify/register`,
    params: {},
    // body: null,
    data: payload,
    signerSecretKey: data.key,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    let res = await httpClient(config);
    return res.data;
  } catch (e) {
    e = !e; // HANDLE error
    console.log(e, "eeee");
  }
}

async function resendOTP({ country_code, phone }, access_token) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    // ts: new Date().toISOString(),
  };
  const data = await encPayload(user);

  const key = await encKey(data.key);

  const payload = {
    body: data.cipherText,
    token: key,
  };

  // send to sever
  const config = {
    method: "post",
    url: `/otp/resend`,
    params: {},
    // body: null,
    data: payload,
    signerSecretKey: data.key,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    let res = await httpClient(config);
    console.log(res.data, "resend success");
    return res.data;
  } catch (e) {
    e = !e; // HANDLE error
  }
}

module.exports = {
  createUser,
  verifySignupOTP,
  resendOTP,
};
