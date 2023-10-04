import {NativeModules } from 'react-native';
const crypto = require("../../crypto");
import RNFS from 'react-native-fs';
import CryptoJs from 'react-native-crypto-js';
import { Buffer } from "buffer";
import { PUBLIC_KEY } from './constants';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
const cryptoModule = NativeModules.MyCryptoModule;
// ----------------------------------------------
async function verifySign(x_hmac_tag, response_body, in_signature) {
  console.log('123456789');
  const publicKeyPath = '/keys/cardbuzz-api.pub';
  const publicKey = await RNFS.readFile(publicKeyPath, 'utf8');

  let body_text = response_body;
  // let body_text = JSON.stringify(response_body);
  const digest = crypto.createHash("sha256").update(body_text).digest("hex");

  const payload = [x_hmac_tag, digest].join("\n");

  return crypto.verify(
    "sha256",
    new Buffer.from(payload),
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
      // padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      // saltLength: crypto.constants.RSA_PSS_SALTLEN_MAX_SIGN,
    },
    Buffer.from(in_signature, "base64")
  );
}

// ----------------------------------------------
function encKey(data) {
  // const publicKey = Buffer.from(PUBLIC_KEY);

  // const publicKeyWordArray = CryptoJs.enc.Hex.parse(PUBLIC_KEY);
  const encryptedData =  CryptoJs.AES.encrypt(data, PUBLIC_KEY).toString();
  // console.log(encryptedData, '&&&&&&&&&&&&&&&&&&&&&hahshahdadhagds')
  return encryptedData;
}

// ----------------------------------------------
async function genRandomKey_b64(size = 32) {
  // const key = CryptoJs.lib.WordArray.random(size);
  // const base64Key = CryptoJs.enc.Base64.stringify(key);
  const base64Key = await cryptoModule.genRandomKey_b64(size);
  console.log({base64Key})
  return base64Key;
}

// ----------------------------------------------
async function encPayload(data, secretKey) {
  try{
    const finaldata = await cryptoModule.encrypt(data, secretKey);
    console.log({finaldata});
  } catch(error) {
    console.error(error)
  }

  // data = JSON.stringify(data);

  // if (typeof secretKey === "undefined") {
  //   secretKey = await genRandomKey_b64(32);
  // }
  // const key = Buffer.from(secretKey, "base64");

  // const iv = await genRandomKey_b64(12);

  // let cipher = crypto.createCipheriv("chacha20-poly1305", key, iv, {
  //   authTagLength: 16,
  // });
  // // const cipherText = cipher.update(data);
  // const cipherText = Buffer.concat([
  //   cipher.update(Buffer.from(data), "utf8"),
  //   cipher.final(),
  // ]);

  // const authTag = cipher.getAuthTag();

  // return {
  //   cipherText: Buffer.concat([iv, cipherText, authTag]).toString("base64"),
  //   key: key.toString("base64"),
  // };
}

// function encPayload(data, secretKey) {
//   data = JSON.stringify(data);

//   if (typeof secretKey === "undefined") {
//     secretKey = genRandomKey_b64(32);
//   }
//   const key = Buffer.from(secretKey, "base64");
//   const iv = CryptoJs.lib.WordArray.random(12);

//   let cipher = crypto.createCipheriv("chacha20-poly1305", key, iv, {
//     authTagLength: 16,
//   });

//   // const cipherText = cipher.update(data);
//   const cipherText = Buffer.concat([
//     cipher.update(Buffer.from(data), "utf8"),
//     cipher.final(),
//   ]);

//   const authTag = cipher.getAuthTag();

//   return {
//     cipherText: Buffer.concat([iv, cipherText, authTag]).toString("base64"),
//     key: key.toString("base64"),
//   };
// }

// ----------------------------------------------

module.exports = {
  verifySign: verifySign,
  encKey: encKey,
  encPayload: encPayload,
  genRandomKey_b64: genRandomKey_b64,
};