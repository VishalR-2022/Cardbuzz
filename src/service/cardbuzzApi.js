import { DEVICE_ID, PUBLIC_KEY } from "./constant";
import { httpClient } from "./httpClient";
import { encPayload, encKey, genX25519KeyPair, getSharedKeyDecoded } from "./utils";

// ------------------------------- DUMMY -------------------------------------
export async function plainReqGet(key, access_token) {
  const config = {
    method: "get",
    url: `/dummy/dummy1`,
    params: {
      b: "c",
      a: [2, 1],
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: key,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }

  return;
}
export async function plainReqPost(key, access_token) {
  let body = { website: "payline.in" };

  const config = {
    method: "post",
    url: `/dummy/dummy1`,
    params: {
      b: "c",
      a: [1, 2],
    },
    // body: null,
    data: body,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: key,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }

  return;
}
export async function encReqGet(key, access_token) {
  const config = {
    method: "get",
    url: `/dummy/dummy1/enc`,
    params: {
      b: "c",
      a: [2, 1],
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: key,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }

  return;
}
export async function encReqPost(key, access_token) {
  let body = { website: "payline.in", ping: "pong" };

  const data = await encPayload(body);
  const payload = {
    body: data.cipherText,
  };

  const config = {
    method: "post",
    url: `/dummy/dummy1/enc`,
    params: {
      b: "c",
      a: [1, 2],
    },
    // body: null,
    data: payload,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: key,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }

  return;
}

//----------------------------- CREATE USER ----------------------------

export async function createUser({ country_code, phone }) {
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

// ------------------------------- PIN APIs ---------------------------------
export async function createUserPin(
  { country_code, phone },
  access_token,
  pin
) {
  const pubKeyPem_b64 = await genX25519KeyPair();
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
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

  let res;
  try {
    res = await httpClient(config);
    if(res?.code) {
      console.log(res, 'only err')
    }
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
    device_id: DEVICE_ID,
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
    device_id: DEVICE_ID,
    pin: pin,
    // intent_req_token: intent.token,
    intent_req_action: intent.action,
    // ts: new Date().toISOString(),
  };
  const data = await encPayload(user);

  const payload = {
    body: data.cipherText,
  };
  console.log(payload);

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
    console.log(res.data);
    return res.data;
  } catch (e) {
    e = !e; // HANDLE error
  }
}

export async function loginViaPin({ country_code, phone }, pin) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    pin: pin,
  };
  const data = await encPayload(user);
  const secretKey = await getSharedKeyDecoded();

  const key = await encKey(secretKey);

  const payload = {
    body: data.cipherText,
    token: key,
  };
  // console.log(payload);

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
    console.log(res.data);
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
    device_id: DEVICE_ID,
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
    device_id: DEVICE_ID,
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