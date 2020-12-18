import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-component";
import { toast } from "react-toastify";
import LoaderSpinner from "../common/LoaderSpinner";
import Like from "../common/Like";
import { fetchImages, setLike, deleteLike } from "../../actions/images";
import { dateFormat } from "../../utils";

class ImagesPage extends Component {
  state = {
    currentPage: 1
  };

  SCROLL_OFFSET = 80;

  componentDidMount() {
    if (!this.props.isLoggingIn) this.props.fetchImages();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps, state) {
    if (prevProps.isLoggingIn !== this.props.isLoggingIn)
      this.props.fetchImages();
  }

  handleScroll = () => {
    const { isLoading, lastPage, fetchImages } = this.props;
    if (isLoading || lastPage <= this.state.currentPage) return;
    const lastCard = document.querySelector(".image:last-child");
    const lastCardOffset = lastCard.offsetTop + lastCard.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset > lastCardOffset - this.SCROLL_OFFSET) {
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage + 1
        }),
        () => fetchImages(this.state.currentPage)
      );
    }
  };

  isImageLiked = imageId => {
    const image = this.props.images.find(i => i.id === imageId);
    return image.liked_by_user;
  };

  handleLike = imageId => {
    if (!this.props.user) {
      toast.info("Залогиньтесь, чтобы поставить лайк!");
      return;
    }
    if (this.isImageLiked(imageId)) this.props.deleteLike(imageId);
    else this.props.setLike(imageId);
  };

  render() {
    const { images, isLoading } = this.props;
    return (
      <React.Fragment>
        <Masonry className="row">
          {images.map(image => (
            <div key={image.uid} className="col-md-6 col-lg-4 mb-3 image">
              <div className="card position-relative">
                <Link
                  to={{
                    pathname: `/image/${image.id}`,
                    state: { modal: true },
                    imageId: image.id,
                    onLike: () => this.handleLike(image.id)
                  }}
                >
                  <img
                    className="card-img-top"
                    src={image.urls.small}
                    alt={image.description || image.user.name}
                  />
                </Link>
                <div className="card-body">
                  <Like
                    liked={image.liked_by_user}
                    likeCount={image.likes}
                    onClick={() => this.handleLike(image.id)}
                  />
                  <div className="card-text">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        className="rounded-circle mr-2 d-sm-none d-md-inline-block"
                        src={image.user.profile_image.small}
                        alt={image.user.name}
                      />
                      <a
                        className="text-dark"
                        href={image.user.links.html}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {image.user.name}
                      </a>
                    </div>
                    <small className="text-muted">
                      Опубликовано: {dateFormat(image.created_at)}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
        {isLoading && <LoaderSpinner />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    images: state.images.items,
    isLoading: state.images.isLoading,
    lastPage: state.images.lastPage,
    user: !!state.user.authUser.id,
    isLoggingIn: state.user.isLoggingIn
  };
};

export default connect(
  mapStateToProps,
  { fetchImages, setLike, deleteLike }
)(ImagesPage);
