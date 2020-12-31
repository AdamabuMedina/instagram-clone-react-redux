import Unsplash from "unsplash-js"

export const unsplash = new Unsplash({
   accessKey: "UPLaj3YzLjhdRB7mX2zCslbuLPyf1XXpkUc1Hxhkd28",
   secretKey: "XfLUeY3re7H1-fzLrbA1LkpqcpogVG3Jshi_8qQGlQA",
   callbackUrl: "http://ct90046.tmweb.ru/"
})

export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
   "public",
   "write_likes",
])

export const setAccessTokenUnplash = (code) => {
   unsplash.auth.userAuthentication(code)
      .then(res => res.json())
      .then(json =>
         localStorage.setItem("token", json.access_token)
      )
}

export const setBearerToken = (token) => {
   unsplash.auth.setBearerToken(token)
}

export const listImage = (start, token) => {
   setBearerToken(token)
   return unsplash.photos.listImage(start, 10, "latest")
      .then(res => res.json())
}

export const likeImage = (id, token) => {
   setBearerToken(token)
   unsplash.photos.likeImage(id)
}

export const unlikeImage = (id, token) => {
   setBearerToken(token)
   unsplash.photos.unlikeImage(id)
}