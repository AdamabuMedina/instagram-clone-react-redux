import {
  accessKey,
  secretKey,
  authUrl,
  tokenUrl,
  redirectUrl,
  scope,
  tokenKey
} from "../config.json";

import http, { setAuthHeader } from "./httpService";

const getAuthUrl = () =>
  encodeURI(
    `${authUrl}?client_id=${accessKey}&redirect_uri=${redirectUrl}&response_type=code&scope=${scope}`
  );

const getBearerToken = async code => {
  const { data } = await http.post(tokenUrl, {
    client_id: accessKey,
    client_secret: secretKey,
    redirect_uri: redirectUrl,
    code: code,
    grant_type: "authorization_code"
  });
  localStorage[tokenKey] = data.access_token;
  setAuthHeader(localStorage[tokenKey]);
};

export default {
  getAuthUrl,
  getBearerToken
};
