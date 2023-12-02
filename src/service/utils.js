import { PUBLIC_KEY } from "./constant";
import XCrypto from "./XCryptoModule";

async function loadServerPubKey() {
  await XCrypto.loadRSAKey(PUBLIC_KEY);
 }

async function genX25519KeyPair() {
  // stores the priv key in KeyStore
  const kp = await XCrypto.genX25519KeyPair();
  return kp.pubKeyPem;
}

async function refreshAccessToken(refresh_token) {
  const secretkey = getSharedKeyDecoded();
  const key = encKey(secretkey);
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
    e = !e; // HANDLE error
  }

  return;
}

async function genSharedSecret(pub_key_peer) {
  if (typeof pub_key_peer === "undefined") {
    return;
  }
  pub_key_peer = pub_key_peer.trim();
  if (pub_key_peer.length === 0) {
    return;
  }
  const ok = await XCrypto.genSharedKey(pub_key_peer);
  return ok;
}

async function getSharedKeyDecoded() {
  const sharedKeyDecoded_b64 = await XCrypto.getSharedKeyDecoded();
  return sharedKeyDecoded_b64;
}

async function genRandomKey_b64() {
  const key = await XCrypto.getChaChaKey();

  return key;
}

async function encKey(data) {
  if (data === null) {
    data = await getSharedKeyDecoded()
  }
  const encryptedData = await XCrypto.encryptRSA(data);
  // const pub_key_peer =
  // 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUNvd0JRWURLMlZ1QXlFQVhCeFY3cWxxMXlGc3RIOThvakp4c0xBTUNiQytncVlNL1BGS0l5MUJ0VXc9Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo=';

  return encryptedData;
}

async function encPayload(data) {
  const payload = JSON.stringify(data);
  let ret = null;
  try {
    ret = await XCrypto.encryptChaCha(payload);
  } catch (e) {
  }
  return ret;
}

async function verifySign(x_hmac_tag, response_body, in_signature) {
  const verified = await XCrypto.verifySignature(
    x_hmac_tag,
    response_body,
    in_signature
  );

  return verified;
}

export {
  encPayload,
  verifySign,
  refreshAccessToken,
  encKey,
  genSharedSecret,
  getSharedKeyDecoded,
  genX25519KeyPair,
  loadServerPubKey,
};
