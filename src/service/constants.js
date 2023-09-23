const SIGNED_HEADERS = ["x-date", "x-req-id", "x-device-id"];

// device_id is uuid created/stored on every app install .. is not physical device id
const DEVICE_ID = "07f42440-ccf6-4e54-b8f1-13ba69700416";

const API_ENDPOINT = "http://13.126.67.121:8080/api/v1";

const JWT_TOKENS = { access_tmp: null, access: null, refresh: null };

const publicKey= `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiBaKQ1wXhXgDBJaZR4sZ
VwrGCS53Zam1SSxnMJnriQi5wChsYuJP0KKbzwOT2oXFoAaUl0j+BMXFGW5agB8S
dXMHj4XrOZh5T6pLAKbGHEKsa3cutbhjC2nPHTFm6JsKDj+v01xUK42fB9zxcY8A
jI6DQsaJCXH2bDXHadz7gB8YDgZedvg3yHLilpYI/tgS+v42n4FVpvWK5pJ0IhxD
MLeC0qtbtjS0tsXgiukU3UIJswVmSLGIGyLjJIy/sGVQrI0+/iDgeEFn7c3tI7xp
Y3ZWKWkvNncQiDniZhLjEO67+zFHufPey/fo5UnL4d6nXpxnU7NBBx+RJOi0DNid
ZwIDAQAB
-----END PUBLIC KEY-----`

module.exports = {
  SIGNED_HEADERS: SIGNED_HEADERS,
  DEVICE_ID: DEVICE_ID,
  API_ENDPOINT: API_ENDPOINT,
  JWT_TOKENS: JWT_TOKENS,
  PUBLIC_KEY: publicKey
};