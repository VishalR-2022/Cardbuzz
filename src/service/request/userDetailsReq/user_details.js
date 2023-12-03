import { httpClientAgent } from "../../httpClientAgent";
const { encPayload } = require("../../utils");

async function reqGet(key, access_token) {
  const config = {
    method: "get",
    url: `/profile`,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params: {},
    signerSecretKey: key,
  };

  try {
    let res = await httpClientAgent(config);
    if(res === 'refetch_access') {
      return res;
    }
    return res?.data;
  } catch (e) {
    e = !e;
  }
}

async function reqGetQR(key, access_token) {
  const config = {
    method: "get",
    url: `/profile/qr/cash`,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params: {},
    signerSecretKey: key,
  };

  try {
    let res = await httpClientAgent(config);
    return res.data;
  } catch (e) {
    e = !e;
  }

  return;
}

async function reqPost(key, access_token, userData) {
  /**
   * {"partnerReferenceNo":"CARDBUZZ12345","actionName":"ADD_PARTNER_SELLER",
   * "partnerKey":"XXXXXX","p1":"Barber Shop","p2":"Mr Rahul S","p3":"ABC123","p4":"XXXXXXX","p5":"XXXXXXXXX","p6":"1520","p7":"SMALL","p8":"OFFLINE","p9":"PROPRIETARY","p10":"Belgaum","p11":"Belgaum","p12":"29","p13":"591244","p14":"","p15":null,"p16":"000590100021000","p17":"HDFC0000001","p18":"20.23","p19":"70.22","p20":"Kalina","p21":"Santacruz East","p22":"","p23":"","p24":"","p25":"","p26":"19\/11\/1995","p27":"19\/11\/2006","p28":""}
   */  
  const data = await encPayload(userData);
  const payload = {
    body: data.cipherText,
  };
  const config = {
    method: "post",
    url: `/profile`,
    params: {
      ts: +new Date(),
    },
    data: payload,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: key,
  };

  try {
    let res = await httpClientAgent(config);
    return res.data;
  } catch (e) {
    e = !e; // do nothing with the error
  }

  return;
}

async function reqPostPicture(key, access_token, userData) {

  const imageData ={
    uri: userData.uri,
    type: 'image/jpeg',
    name: 'image.jpg',
  }

  let formData = new FormData();
  formData.append('image', imageData);
  console.log(formData, 'formData');

  const config = {
    method: "post",
    url: `/profile/picture`,
    params: {},
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  };

  try {
    let res = await httpClientAgent(config);
    console.log(res.data, '????????');
    return res.data;
  } catch (e) {
    console.log(e, '????????');
    e = !e;
  }
}

async function reqPutKyc(key, access_token, userData) {
  console.log(userData, '>>>>>>>>>>>>>>>>>>> userrr')
  const p = {
    new_settlement_account_number: userData.bank_acc_number,
    new_settlement_account_ifsc: userData.bank_acc_ifsc,
    group: userData.agent_auth_id,
  };
  
  const data = await encPayload(p);
  const payload = {
    body: data.cipherText,
  };
  const config = {
    method: "put",
    url: `/profile`,
    params: {
      ts: +new Date(),
    },
    data: payload,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: key,
  };

  try {
    let res = await httpClientAgent(config);
    return res.data;
  } catch (e) {
    e = !e; // do nothing with the error
    console.log({ status: "FAIL" });
  }
}

module.exports = { reqGet, reqPost, reqPutKyc, reqGetQR, reqPostPicture };
