import httpClientWallet from "../../httpClientWallet";
import { encPayload } from "../../utils";

export const getEarnings = async (key, access_token) => {
  const config = {
    method: "get",
    url: `/transaction/earnings`,
    params: {
      ts: +new Date(),
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: key,
  };

  try {
    let res = await httpClientWallet(config);
    console.log(res.data, "earnings");
  } catch (e) {
    // console.log(e, 'errrr');

    e = !e; // HANDLE error
  }

  return;
};

export const getBalance = async (key, access_token) => {
  const config = {
    method: "get",
    url: `/transaction/balance`,
    params: {
      ts: +new Date(),
      days: 10,
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: key,
  };

  try {
    let res = await httpClientWallet(config);
    console.log(res.data, "balance");
  } catch (e) {
    // console.log(e, 'errrr');

    e = !e; // HANDLE error
  }

  return;
};

export const postTopup = async (key, access_token) => {
  let body = "300";

  const data = await encPayload(body, key);

  const payload = {
    body: data.cipherText,
  };
  const config = {
    method: "post",
    url: `/transaction/topup`,
    params: {
    },
    data: payload,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: key,
  };

  try {
    let res = await httpClientWallet(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }

  return;
};
