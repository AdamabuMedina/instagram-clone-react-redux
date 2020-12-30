import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-component";
import { toast } from "react-toastify";
import scrollPosition from "./consts";
import {unsplashLoadPhotos} from "../../services/unsplash";
import {getUserName, loadPhotos} from "../../actions/action";
import {getFormattedDate} from "../../services/utils";

let itemsWereLoaded = false;

class Images extends Component {
  constructor(props) {
  super(props);
  this.loadPhotos = this.loadPhotos.bind(this);
}

  componentDidMount() {
    if (!itemsWereLoaded) {
      this.loadPhotos();
      itemsWereLoaded = true;
    }
  }

  loadPhotos() {
    let page = localStorage.getItem("page");

    unsplashLoadPhotos(page, localStorage.getItem("token"))
      .then((photos) => {
        this.props.loadPhotos(photos);
      })
      .then(() => {
        localStorage.setItem("page", +page + 1);
        window.scrollTo({ top: scrollPosition });
      });
  }

  isImageLiked = imageId => {
    const photo = this.props.photos.find(i => i.id === imageId);
    return photo.liked_by_user;
  };

  handleLike = imageId => {
    if (!this.props.user) {
      toast.info("Авторизуйтесь, чтобы поставить лайк!");
      return;
    }
    if (this.isImageLiked(imageId)) this.props.deleteLike(imageId);
    else this.props.setLike(imageId);
  };

  render() {
    const { photos, isLoading } = this.props;
    return (
      <ul>
          {this.props.photos.map((photo, i) => (

            <div key={photo.uid} className="col-md-6 col-lg-4 mb-3 image">
              <div className="card position-relative">
                <Link
                  to={{
                    pathname: `/image/${photo.id}`,
                    state: { modal: true },
                    photoId: photo.id,
                    onLike: () => this.handleLike(photo.id)
                  }}
                >
                  <img
                    className="card-img-top"
                    src={photo.urls.small}
                    alt={photo.description || photo.user.name}
                  />
                </Link>
                <div className="card-body">
                  <div className="card-text">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        className="rounded-circle mr-2 d-sm-none d-md-inline-block"
                        src={photo.user.profile_image.small}
                        alt={photo.user.name}
                      />
                      <a
                        className="text-dark"
                        href={photo.user.links.html}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {photo.user.name}
                      </a>
                    </div>
                    <small className="text-muted">
                      Опубликовано: {getFormattedDate(photo.updated_at)}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <button
          className="show-more-button"
          onClick={(e) => {
            this.loadPhotos();
          }}
        >
          Загрузить еще
        </button>
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({ photos: state.photos, user: state.user });

function mapDispatchToProps(dispatch) {
  return {
    loadPhotos: (photos) => dispatch(loadPhotos(photos)),
    getUserName: (user) => dispatch(getUserName(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Images);
