import {DEVICE_ID, PUBLIC_KEY} from '../constant';
import XCrypto from '../XCryptoModule';

const SecurePK = {
  priv_key_b64: '',
  peer_pub_key_b64: '',
  shared_secret_key_b64: '',
};

async function genX25519KeyPair() {
  // stores the priv key in KeyStore
  const kp = await XCrypto.genX25519KeyPair();
  return kp.pubKeyPem;
}

async function refreshAccessToken(refresh_token) {
  const secretkey = genRandomKey_b64();
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
    console.log(res.data);
  } catch (e) {
    console.log(e.toString());
    e = !e; // HANDLE error
  }

  return;
}

async function genSharedSecret(pub_key_peer) {
  if (typeof pub_key_peer === 'undefined') {
    console.log('pub_key_peer missing');
    return;
  }
  pub_key_peer = pub_key_peer.trim();
  if (pub_key_peer.length === 0) {
    console.log('pub_key_peer invalid');
    return;
  }
  const ok = await XCrypto.genSharedKey(pub_key_peer);
  console.log('ok=', ok);
  return ok;
}

async function getSharedKeyDecoded() {
  const sharedKeyDecoded_b64 = await XCrypto.getSharedKeyDecoded();
  console.log('sharedKeyDecoded_b64=', sharedKeyDecoded_b64);
  return sharedKeyDecoded_b64;
}

async function genRandomKey_b64() {
  const key = await XCrypto.getChaChaKey();
  console.log('key=', key);

  return key;
}

async function encKey(data) {
  console.log('data=', data);
  const encryptedData = await XCrypto.encryptRSA(data);
  console.log('encryptedData=', encryptedData);
  // const pub_key_peer =
  // 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUNvd0JRWURLMlZ1QXlFQVhCeFY3cWxxMXlGc3RIOThvakp4c0xBTUNiQytncVlNL1BGS0l5MUJ0VXc9Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo=';
  // console.log(await genSharedSecret(pub_key_peer));

  return encryptedData;
}

async function encPayload(data) {

  const payload = JSON.stringify(data);
  let ret = null;
  try {
    ret = await XCrypto.encryptChaCha(payload);
  } catch (e) {
    console.log(e);
  }
  return ret;
}

async function verifySign(x_hmac_tag, response_body, in_signature) {
  const verified = await XCrypto.verifySignature(
    x_hmac_tag,
    response_body,
    in_signature,
  );
  console.log('verified=', verified);

  return verified;
}

async function testHarness() {
  /////////////////////////////////////////////////
  // load server pub key
  // this is on app load. one time call. chk where best to call and how
  /////////////////////////////////////////////////
  await XCrypto.loadRSAKey(PUBLIC_KEY);
  /////////////////////////////////////////////////

//  console.log(await genX25519KeyPair());

  console.log(await genRandomKey_b64());

  const pub_key_peer =
    'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUNvd0JRWURLMlZ1QXlFQVhCeFY3cWxxMXlGc3RIOThvakp4c0xBTUNiQytncVlNL1BGS0l5MUJ0VXc9Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo=';
  console.log(await genSharedSecret(pub_key_peer));

  console.log(await getSharedKeyDecoded());
  // sample req data
  const data = {
    country_code: '91',
    phone: '1234567890',
    device_id: DEVICE_ID,
    fcm_reg_token: 'xxx2x-yyyyy',
    // created_at: new Date().toISOString(),
  };
  const ret = await encPayload(data);

  console.log(ret)
  const key = await encKey(ret.key)

  const payload = {
    body: ret.cipherText,
    token: key,
  };

  // send to sever
  const config = {
    method: "post",
    url: `/user`,
    params: {},
    // body: null,
    data: payload,
    signerSecretKey: ret.key,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    console.log(e);
    e = !e; // HANDLE error
  }  // console.log(await encKey(ret.key));
  // return;
}

export {encPayload, verifySign, refreshAccessToken, encKey, genSharedSecret, getSharedKeyDecoded};
