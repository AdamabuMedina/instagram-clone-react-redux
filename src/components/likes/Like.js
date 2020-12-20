import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasFaHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farFaHeart } from "@fortawesome/free-regular-svg-icons";

const Like = ({ liked, onClick, likeCount }) => (
  <button onClick={onClick} className="like d-flex align-items-center">
    <FontAwesomeIcon
      className="like__icon mr-1"
      icon={!liked ? farFaHeart : fasFaHeart}
    />
    <span className="like__count text-dark">{likeCount}</span>
  </button>
);

export default Like;
