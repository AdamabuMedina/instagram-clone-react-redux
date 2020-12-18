import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import Like from "../common/Like";

class ImageDetailPage extends Component {
  handleCloseModal = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { image } = this.props;
    const { onLike } = this.props.location;
    return (
      <Modal
        styles={{
          modal: { maxWidth: "992px" },
          closeButton: { cursor: "pointer", outline: "none" }
        }}
        open
        onClose={this.handleCloseModal}
      >
        <div className="d-flex flex-wrap align-items-center mt-4 mb-2 image-detail">
          <img
            className="rounded-circle mr-3"
            src={image.user.profile_image.medium}
            alt={image.user.name}
          />
          <a
            className="text-dark lead mr-auto"
            href={image.user.links.html}
            target="_blank"
            rel="noopener noreferrer"
          >
            {image.user.name}
          </a>

          <Like
            liked={image.liked_by_user}
            likeCount={image.likes}
            onClick={() => onLike(image.id)}
          />
        </div>
        <img
          className="img-fluid"
          src={image.urls.regular}
          alt={image.user.name}
        />
      </Modal>
    );
  }
}

const imageSelector = (state, ownProps) =>
  state.images.items.find(i => i.id === ownProps.location.imageId);

const mapStateToProps = (state, ownProps) => ({
  image: imageSelector(state, ownProps)
});

export default connect(mapStateToProps)(ImageDetailPage);
