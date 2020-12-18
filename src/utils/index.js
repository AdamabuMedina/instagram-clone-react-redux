import moment from "moment";
import shortid from "shortid";
import { tokenKey } from "../config.json";

export const dateFormat = date => moment(date).format("DD.MM.YYYY");

export const getTokenFromStorage = () => localStorage[tokenKey];

export const addShortId = arr =>
  arr.map(e => {
    return { uid: shortid.generate(), ...e };
  });

export const extractDataFromResponse = data => {
  return data.map(e => {
    const {
      id,
      created_at,
      description,
      liked_by_user,
      likes,
      user: {
        name,
        profile_image: { small: userProfileImage, medium },
        links: { html }
      },
      urls: { small, regular }
    } = e;
    return {
      id,
      created_at,
      description,
      liked_by_user,
      likes,
      user: {
        name,
        profile_image: { small: userProfileImage, medium },
        links: { html }
      },
      urls: { small, regular }
    };
  });
};
