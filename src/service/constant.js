const SIGNED_HEADERS = ['x-date', 'x-req-id', 'x-device-id'];

const API_ENDPOINT = "https://auth.svc.steady-rabbit.com/api/v1";
const API_Agent_ENDPOINT = "https://agent.svc.steady-rabbit.com/api/v1";

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiBaKQ1wXhXgDBJaZR4sZ
VwrGCS53Zam1SSxnMJnriQi5wChsYuJP0KKbzwOT2oXFoAaUl0j+BMXFGW5agB8S
dXMHj4XrOZh5T6pLAKbGHEKsa3cutbhjC2nPHTFm6JsKDj+v01xUK42fB9zxcY8A
jI6DQsaJCXH2bDXHadz7gB8YDgZedvg3yHLilpYI/tgS+v42n4FVpvWK5pJ0IhxD
MLeC0qtbtjS0tsXgiukU3UIJswVmSLGIGyLjJIy/sGVQrI0+/iDgeEFn7c3tI7xp
Y3ZWKWkvNncQiDniZhLjEO67+zFHufPey/fo5UnL4d6nXpxnU7NBBx+RJOi0DNid
ZwIDAQAB
-----END PUBLIC KEY-----`;

const API_BBPS_ENDPOINT = 'https://ybl-bbps.svc.steady-rabbit.com/api/v1'

module.exports = {
  SIGNED_HEADERS: SIGNED_HEADERS,
  API_ENDPOINT: API_ENDPOINT,
  API_Agent_ENDPOINT: API_Agent_ENDPOINT,
  PUBLIC_KEY: publicKey,
  API_BBPS_ENDPOINT: API_BBPS_ENDPOINT
};
