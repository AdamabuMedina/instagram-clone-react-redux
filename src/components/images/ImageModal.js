import React, {Component} from "react";
import {connect} from "react-redux";
import Modal from "react-responsive-modal";
import liked from "../../assets/001-like.png";
import unliked from "../../assets/002-heart.png";
import {unsplashGetPhoto, unsplashLikePhoto, unsplashUnlikePhoto} from "../../services/unsplash";
import {getFormattedDate} from "../../services/utils";
import {getPhoto, likePhoto, unlikePhoto} from "../../actions/action";

class ImageModal extends Component {
  constructor(props) {
    super(props);
    this.getPhoto = this.getPhoto.bind(this)

    const id = window.location.pathname.split("photos/")[1]
    this.getPhoto(id)
  }

  componentDidMount() {
    document.body.style.overflowY = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflowY = "auto";
  }

  getPhoto(id) {
    if (this.props.photos.length > 0) {
      this.props.photos.forEach((photo) => {
        if (photo.id === id) {
          this.props.getPhoto(photo);
        }
      });
    } else {
      unsplashGetPhoto(id, localStorage.getItem("token")).then((photo) => {
        this.props.getPhoto(photo);
      });
    }
  }

  toggleLike() {
    const token = localStorage.getItem("token");
    const id = this.props.photo.id;

    if (this.props.photo.liked_by_user) {
      unsplashUnlikePhoto(id, token).then((json) =>
        this.props.unlikePhoto(json.photo)
      );
    } else {
      unsplashLikePhoto(id, token).then((json) =>
        this.props.likePhoto(json.photo)
      );
    }
  }

  handleCloseModal = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const bgImages = {
      liked: {
        backgroundImage: "url(" + liked + ")",
      },
      unliked: {
        backgroundImage: "url(" + unliked + ")",
      }
    };

    const id = this.props.photo.id;
    const url = this.props.photo.links.html;
    const author = this.props.photo.user.name;
    const image = this.props.photo.urls.small;
    const isLiked = this.props.photo.liked_by_user;
    const likesCount = this.props.photo.likes;
    const date = getFormattedDate(this.props.photo.updated_at);

    return (
      <Modal
        styles={{
          modal: {maxWidth: "992px"},
          closeButton: {cursor: "pointer", outline: "none"}
        }}
        open
        onClose={this.handleCloseModal}
      >
        <h2>
          <a href={url}>{author}</a>
        </h2>

        <img src={image} alt={image}/>

        <button
          style={isLiked ? bgImages.liked : bgImages.unliked}
          onClick={this.toggleLike.bind(this)}>
        </button>

        <p>{likesCount}</p>

        <time>{date}</time>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  photos: state.photos,
  photo: state.currentPhoto,
});

const mapDispatchToProps = (dispatch) => ({
  getPhoto: (photo) => dispatch(getPhoto(photo)),
  likePhoto: (id) => dispatch(likePhoto(id)),
  unlikePhoto: (id) => dispatch(unlikePhoto(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageModal);
