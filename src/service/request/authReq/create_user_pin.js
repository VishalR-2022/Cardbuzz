import { DEVICE_ID, PUBLIC_KEY } from "../../constant";
import { httpClient } from "../../httpClient";
const { encPayload, encKey, genX25519KeyPair } = require("../../utils");
// ----------------------------------------------
// ----------------------------------------------

// this needs to be saved securely in keystore/keychain
// const SecurePK = {
//   priv_key_b64: "",
//   peer_pub_key_b64: "",
//   shared_secret_key_b64: "",
// };

// function genSharedSecret() {
//   priv_key = crypto.createPrivateKey(
//     Buffer.from(SecurePK.priv_key_b64, "base64")
//   );
//   pub_key = crypto.createPublicKey(
//     Buffer.from(SecurePK.peer_pub_key_b64, "base64")
//   );
//   const shared_key = crypto.diffieHellman({
//     publicKey: pub_key,
//     privateKey: priv_key,
//   });

//   const derived_shared_key = crypto.hkdfSync("sha256", shared_key, "", "", 32);
//   const derived_shared_key_b64 =
//     Buffer.from(derived_shared_key).toString("base64");

//   return derived_shared_key_b64;
// }

// function genX25519KeyPair() {
//   const pk = crypto.generateKeyPairSync("x25519");

//   // store privKeyPem securely in keystore
//   const privKeyPem = pk.privateKey.export({ type: "pkcs8", format: "pem" });

//   const pubKeyPem = pk.publicKey.export({ type: "spki", format: "pem" });

//   SecurePK.priv_key_b64 = Buffer.from(privKeyPem, "utf-8").toString("base64");

//   return Buffer.from(pubKeyPem, "utf8").toString("base64");
// }

async function createUserPin({ country_code, phone }, access_token, pin) {
 const pubKeyPem_b64 = await genX25519KeyPair();

 console.log(pubKeyPem_b64, pin, access_token, '-----')
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
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
    return;
  }

  // const peer_pub_key_b64 = res.data.data.ppk;
  // SecurePK.peer_pub_key_b64 = peer_pub_key_b64;

  // SecurePK.shared_secret_key_b64 = genSharedSecret();

  // console.log("shared_secret_key=", SecurePK.shared_secret_key_b64);
}

// ----------------------------------
// ----------------------------------
async function forgotPin({ country_code, phone }) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
  };
  const data = encPayload(user);

  const key = encKey(data.key);

  const payload = {
    body: data.cipherText,
    token: key,
  };
  // console.log(payload);

  // send to sever
  const config = {
    method: "post",
    url: `/pin/forgot`,
    params: {},
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
// ----------------------------------
// ----------------------------------
async function loginViaPin({ country_code, phone }, pin) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    pin: pin,
  };
  const data = encPayload(user);

  const key = encKey(data.key);

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
    signerSecretKey: data.key,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }
}

module.exports = { createUserPin, forgotPin, loginViaPin };