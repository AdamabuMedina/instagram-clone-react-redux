import Unsplash, {toJson} from "unsplash-js";

export const unsplash = new Unsplash({
  accessKey: "UPLaj3YzLjhdRB7mX2zCslbuLPyf1XXpkUc1Hxhkd28",
  secretKey: "XfLUeY3re7H1-fzLrbA1LkpqcpogVG3Jshi_8qQGlQA",
  callbackUrl: "http://ct90046.tmweb.ru"
})

export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "write_likes"
])

export const userAccessToken = (OAUTH_CODE) => {
  unsplash.auth
    .userAuthentication(OAUTH_CODE)
    .then(toJson)
    .then((json)=> {
      localStorage.setItem("token", json.access_token)
    })
}

export const unsplashGetUser = (token) => {
  unsplash.auth.setBearerToken(token)

  return unsplash.currentUser.profile()
    .then(toJson)
}

export const unsplashLoadPhotos = (page, token, perPage = 10) => {
  unsplash.auth.setBearerToken(token);

  return unsplash.photos.listPhotos(page, perPage, "latest").then(toJson);
};

export const unsplashGetPhoto = (id, token) => {
  unsplash.auth.setBearerToken(token);

  return unsplash.photos.getPhoto(id).then(toJson);
};

export const unsplashLikePhoto = (id, token) => {
  unsplash.auth.setBearerToken(token);

  return unsplash.photos.likePhoto(id).then(toJson);
};

export const unsplashUnlikePhoto = (id, token) => {
  unsplash.auth.setBearerToken(token);

  return unsplash.photos.unlikePhoto(id).then(toJson);
};
