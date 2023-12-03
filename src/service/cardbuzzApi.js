import { DEVICE_ID } from "../constants/DeviceInfo";
import { httpClient } from "./httpClient";

import { encPayload, encKey, getSharedKeyDecoded, genRSAKeyPair, genRandomKey_b64 } from "./utils";
//----------------------------- CREATE USER ----------------------------

export async function createUser({ country_code, phone }) {
  const user = {
    country_code: country_code,
    phone: phone,
    device_id: await DEVICE_ID(),
    fcm_reg_token: "xxx2x-yyyyy",
  };

  const data = await encPayload(user);
  const key = await encKey(data.key);

  const payload = {
    body: data.cipherText,
    token: key,
  };

  const config = {
    method: "post",
    url: `/user`,
    params: {},
    data: payload,
    signerSecretKey: data.key,
  };

  try {
    let res = await httpClient(config);
    return res.data;
  } catch (e) {
    e = !e;
  }
}

export async function createUserPin(
  { country_code, phone },
  access_token,
  pin
) {
  const pubKeyPem_b64 = await genRSAKeyPair();
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: await DEVICE_ID(),
    pin: pin,
    pub_key: pubKeyPem_b64,
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
    url: `/pin/create`,
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
    // if(res?.code) {
    // }
    return res.data;
  } catch (e) {
    return e;
  }
}

export async function resetPin(
  { country_code, phone },
  secretKey,
  access_token,
  old_pin,
  new_pin
) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: await DEVICE_ID(),
    pin: old_pin,
    new_pin: new_pin,
    // ts: new Date().toISOString(),
  };
  const data = await encPayload(user, secretKey);

  const payload = {
    body: data.cipherText,
  };

  // send to sever
  const config = {
    method: "post",
    url: `/pin/reset`,
    params: {},
    // body: null,
    data: payload,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: secretKey,
  };

  try {
    let res = await httpClient(config);
    return res.data;
  } catch (e) {
    e = !e; // HANDLE error
  }
}

export async function verifyPin(
  { country_code, phone },
  secretKey,
  access_token,
  pin,
  intent
) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: await DEVICE_ID(),
    pin: pin,
    // intent_req_token: intent.token,
    intent_req_action: intent.action,
    // ts: new Date().toISOString(),
  };
  const data = await encPayload(user);

  const payload = {
    body: data.cipherText,
  };

  // send to sever
  const config = {
    method: "post",
    url: `/pin/verify`,
    params: {},
    // body: null,
    data: payload,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: secretKey,
  };

  try {
    let res = await httpClient(config);
    return res.data;
  } catch (e) {
    e = !e; // HANDLE error
  }
}

export async function loginViaPin({ country_code, phone }, pin) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: await DEVICE_ID(),
    pin: pin,
  };
  const data = await encPayload(user);
  const secretKey = await getSharedKeyDecoded();

  const key = await encKey(secretKey);

  const payload = {
    body: data.cipherText,
    token: key,
  };

  // send to sever
  const config = {
    method: "post",
    url: `/pin/login`,
    params: {},
    // body: null,
    data: payload,
    signerSecretKey: secretKey,
  };

  try {
    let res = await httpClient(config);
    return res.data;
  } catch (e) {
    e = !e; // HANDLE error
  }
}

// -------------------------------------- LOGOUT -------------------------
export async function logout(secretKey, access_token) {
  // send to sever
  const config = {
    method: "delete",
    url: `/user/token/logout`,
    params: {},
    // body: null,
    // data: payload,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: secretKey,
  };

  try {
    let res = await httpClient(config);
    return res.data;
  } catch (e) {
    e = !e; // HANDLE error
  }
}

// --------------------------------------- OTP api -----------------------
async function sendAnyOtherOTP(
  { country_code, phone },
  secretKey,
  access_token,
  intent
) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: await DEVICE_ID(),
    intent_req_action: intent.action,
    // ts: new Date().toISOString(),
  };
  const data = await encPayload(user, secretKey);

  const payload = {
    body: data.cipherText,
  };
  // console.log(payload);

  // send to sever
  const config = {
    method: "post",
    url: `/otp/send`,
    params: {},
    // body: null,
    data: payload,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: secretKey,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }
}

export async function verifySignupOTP(
  { country_code, phone },
  access_token,
  otp
) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: await DEVICE_ID(),
    otp: otp,
    // fcm_reg_token: "xxx2x-yyyyy",
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

export async function resendOTP({ country_code, phone }, access_token) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: await DEVICE_ID(),
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

export const refreshTokenApi = async (refresh_token) => {
    const secretkey = await genRandomKey_b64()
    const key = await encKey(secretkey);
    const config = {
      method: "get",
      url: `/user/token/refresh`,
      params: {
        token: key,
      },
      signerSecretKey: secretkey,
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
    };
  
    try {
      let res = await httpClient(config);
      return res.data;
    } catch (e) {
      console.log(e.toString());
      e = !e; // HANDLE error
    }
  }
