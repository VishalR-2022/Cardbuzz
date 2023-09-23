const { httpClient } = require("../httpClient");
const { encKey, encPayload } = require("../utils");
const { SIGNED_HEADERS, DEVICE_ID, API_ENDPOINT } = require("../constants");

// ----------------------------------------------
// ----------------------------------------------

async function resendAnyOtherOTP(
  { country_code, phone },
  secretKey,
  access_token
) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    // ts: new Date().toISOString(),
  };
  const data = encPayload(user, secretKey);

  const payload = {
    body: data.cipherText,
  };
  // console.log(payload);

  // send to sever
  const config = {
    method: "post",
    url: `/otp/resend`,
    params: {
      ts: +new Date(),
    },
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
async function verifyAnyOtherOTP(
  { country_code, phone },
  secretKey,
  access_token,
  otp
) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    otp: otp,
    // ts: new Date().toISOString(),
  };
  const data = encPayload(user, secretKey);

  const payload = {
    body: data.cipherText,
  };

  // send to sever
  const config = {
    method: "post",
    url: `/otp/verify`,
    params: {
      ts: +new Date(),
    },
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

async function verifyPin(
  { country_code, phone },
  secretKey,
  access_token,
  pin
) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    pin: pin,
    // ts: new Date().toISOString(),
  };
  const data = encPayload(user, secretKey);

  const payload = {
    body: data.cipherText,
  };
  console.log(payload);

  // send to sever
  const config = {
    method: "post",
    url: `/pin/verify`,
    params: {
      ts: +new Date(),
    },
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

async function resetPin(
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
  const data = encPayload(user, secretKey);

  const payload = {
    body: data.cipherText,
  };
  console.log(payload);

  // send to sever
  const config = {
    method: "post",
    url: `/pin/reset`,
    params: {
      ts: +new Date(),
    },
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

module.exports = {
  resendAnyOtherOTP: resendAnyOtherOTP,
  verifyAnyOtherOTP: verifyAnyOtherOTP,
  verifyPin: verifyPin,
  resetPin: resetPin,
};