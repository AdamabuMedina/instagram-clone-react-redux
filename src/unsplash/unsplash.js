import Unsplash from "unsplash-js";

export const unsplash = new Unsplash({
   accessKey: "UPLaj3YzLjhdRB7mX2zCslbuLPyf1XXpkUc1Hxhkd28",
   secretKey: "XfLUeY3re7H1-fzLrbA1LkpqcpogVG3Jshi_8qQGlQA",
   callbackUrl: "http://ct90046.tmweb.ru/auth",
})

export const authenticationUnsplash = (unsplash) => {
   const authenticationUrl = unsplash.auth.getAuthenticationUrl([
      "public",
      "write_likes",
   ])

   const code = window.location.search.split("code=")[1];

   if (!code) {
      window.location.assign(authenticationUrl);
   }
}

export const identifyUser = (unsplash) => {
   const code = window.location.search.split("code=")[1];

   if (code) {
      unsplash.auth.userAuthentication(code)
         .then(res => res.json())
         .then(json => {
            unsplash.auth.setBearerToken(json.access_token);
            localStorage.setItem("user_info", JSON.stringify
               ({ access_token: json.access_token, refresh_token: json.refresh_token }))
         });
   }
}

export const likePhoto = (unsplash, image) => {
   if (image.liked_by_user === false) {
      return (
         unsplash.photos.likePhoto(image.id)
            .then((res) => res.text())
            .then((res) => {
               if (res !== "Rate Limit Exceeded" && !JSON.parse(res).errors) {
                  JSON.parse(res);
               }
               console.error("Лимит запросов исчерпан!")
            })
      );
   }

   else if (image.liked_by_user === true) {
      return (
         unsplash.photos.unlikePhoto(image.id)
            .then((res) => res.text())
            .then((res) => {
               if (res !== "Rate Limit Exceeded" && !JSON.parse(res).errors) {
                  return JSON.parse(res);
               }
               console.error("Лимит запросов исчерпан!");
            })
      );
   }
};