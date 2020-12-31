import { ADD_IMAGES, LIKED_IMAGE, LOG_IN, LOG_OUT, UNLIKED_IMAGE } from "../actions/types";

const reducer = (state = [], action) => {
   switch (action.type) {
      case ADD_IMAGES:
         return [...state, ...action.images]

      case LOG_IN:
         return { ...state }

      case LOG_OUT:
         return { ...state }

      case LIKED_IMAGE:
         return state.map((image) => {
            if (image.id === action.id) {
               return {
                  id: action.id,
                  likes: action.likes,
                  liked_by_user: action.liked_by_user,
                  urls: {
                     small: image.urls.small,
                     regular: image.urls.regular
                  },
                  user: {
                     first_name: image.user.first_name,
                     profile_image: { small: image.user.profile_image.small },
                     links: { html: image.user.links.html },
                  },
                  created_at: image.created_at
               }
            }
            return image
         })

      case UNLIKED_IMAGE:
         return state.map((image) => {
            if (image.id === action.id) {
               return {
                  id: action.id,
                  likes: action.likes,
                  liked_by_user: action.liked_by_user,
                  urls: {
                     small: image.urls.small,
                     regular: image.urls.regular
                  },
                  user: {
                     first_name: image.user.first_name,
                     profile_image: { small: image.user.profile_image.small },
                     links: { html: image.user.links.html },
                  },
                  created_at: image.created_at
               }
            }
            return image
         })

      default:
         return state;
   }
}

export default reducer