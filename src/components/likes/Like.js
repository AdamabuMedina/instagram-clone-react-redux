import {LikesHeart} from "../../services/svg";

const Like = ({onClick, likeCount}) => (
    <button className="btn btn-primary d-flex align-items-center" onClick={onClick}>
        <LikesHeart />
        <span className="like__count text-dark">{likeCount}</span>
    </button>
)

export default Like