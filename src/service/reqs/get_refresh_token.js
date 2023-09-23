const { httpClient } = require("../httpClient");
const { encKey, encPayload, genRandomKey_b64 } = require("../utils");

async function getRefreshToken(refresh_token) {
  const secretkey = genRandomKey_b64(32);
  const key = encKey(secretkey);
  const config = {
    method: "get",
    url: `/user/refresh`,
    params: {
      token: key,
      ts: +new Date(),
    },
    signerSecretKey: secretkey,
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
    console.log(e);
  }

  return;
}

module.exports = { getRefreshToken };