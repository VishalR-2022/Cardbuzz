import httpClientBbps from "../../httpClientBbps";

const plainReqGet = async (key, access_token, url) => {
  const config = {
    method: "get",
    url: url,
    params: {},
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: key,
  };

  try {
    let res = await httpClientBbps(config);
    console.log(res)
    return res.data;
  } catch (e) {
    e = !e;
  }
};

export const reqGetBillerUnderCategory = async (
  key,
  access_token,
  category
) => {
  const url = `/bbps/biller_by_category/${category}`;
  const response = await plainReqGet(key, access_token, url);
  return response;
};
