const crypto = require("../../crypto");
import { Buffer } from "buffer";

const canonicalize_uri = (uri) => {
  const pathnameMatch = uri.match(/^(https?:\/\/[^/]+)?(\/[^\?#]*)/);
  if (pathnameMatch) {
    const pathname = pathnameMatch[2];
    return pathname;
  }
  return uri;
};

const canonicalize_headers = (headers, signed_headers) => {
  var headers_string = [];
  for (const i in signed_headers) {
    const hdr = signed_headers[i];
    if (!(hdr in headers)) {
      throw new Error("missing required header=" + hdr);
    }
    headers_string.push(`${hdr}:${headers[hdr].trim()}`);
  }

  headers_string = headers_string.sort();
  var hs = headers_string.join("\n");
  return hs;
};

const canonicalize_query_string = (params) => {
  var sorted_qs = [];
  for (const key in params) {
    var val = params[key];
    if (Array.isArray(val)) val = val.sort();
    var encoded_input = encodeURIComponent(val);
    // var encoded_input = encodeURIComponent(val).replace(/%20/g, "+");
    sorted_qs.push(`${key}=${encoded_input}`);
  }
  sorted_qs = sorted_qs.sort();
  sorted_qs = sorted_qs.join("&");
  // var qs = sorted_qs;
  var qs = sorted_qs.replace(/\+/g, "%20");
  return qs;
};
const req_payload_hash = (body) => {
  if (body === null || typeof body === undefined) return "";

  let body_text = JSON.stringify(body);
  // const body_text = body.toString();
  const digest = crypto.createHash("sha256").update(body_text).digest("hex");
  return digest;
};

const _sign = (ts, msg, secretKey) => {
  const key = crypto
    .createHmac("sha256", secretKey)
    .update(`${msg.length}${ts}`)
    .digest();

  return crypto.createHmac("sha256", key).update(msg).digest("base64");
};

const sign = (
  { url, method, params, data: body = null, headers },
  key,
  signed_headers,
  api_endpoint
) => {
  console.log(body)
  secretKey = Buffer.from(key, 'base64');
  if (!url.startsWith("http://") || !url.startsWith("https://")) {
    url = api_endpoint + url;
  }

  const req_method = method.toUpperCase();

  const req_uri = canonicalize_uri(url);
  // console.log(req_uri, '>>>>>>>>>>>>>>>>>>>>>>>> uri')
  const qs = canonicalize_query_string(params);
  const hs = canonicalize_headers(headers, signed_headers);
  const body_hash = req_payload_hash(body);

  const canonicalizedRequest = [req_method, req_uri, qs, hs, body_hash].join(
    "\n"
    );
    
    const canonicalizedRequest_hash = crypto
    .createHash("sha256")
    .update(canonicalizedRequest)
    .digest("hex");
    
    // console.log(canonicalizedRequest_hash, 'body_hashhhhhhhhhh');
  const timestamp = headers["x-date"];
  const data = ["HMAC-SHA256", timestamp, canonicalizedRequest_hash].join("\n");

  const signature = _sign(timestamp, data, secretKey);
  // console.log(_sign(timestamp, data, secretKey), data, secretKey, 'kkkkjkjjkjkjkjk')
  return signature;
};

module.exports = { sign: sign };