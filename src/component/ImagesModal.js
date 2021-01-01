import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { listImage, setAccessTokenUnplash } from "../unsplash/unsplash";

class ImagesModal extends Component {
   constructor(props) {
      super(props);
      this.loadImages = this.loadImages.bind(this);
      if (localStorage.getItem("token") === "undefined" ||
         localStorage.getItem("token") === "" ||
         !localStorage.getItem("token")) {
         this.setAccessToken();
      }
   }

   componentDidMount() {
      this.loadImages();
   }

   setAccessToken() {
      const code = window.location.search.split("code=")[1];

      if (code) {
         setAccessTokenUnplash(code);
      }
   }

   loadImages() {
      const start = this.props.images.length + 1;
      const images = listImage(start, localStorage.getItem("token"));
      images.then(image => this.props.addImages(image));
   }

   render() {
      return (
         <div>
            <NavLink to="/photo" className="back">
               Назад
            </NavLink>
            {
               this.props.images.map((image, i) => {
                  if (i === this.props.match.params.id) {
                     let date = `${image.created_at[8]}${image.created_at[9]}.${image.created_at[5]}${image.created_at[6]}.${image.created_at[0]}${image.created_at[1]}${image.created_at[2]}${image.created_at[3]}`
                     let liked = (image.liked_by_user) ? "btn btn-like liked" : "btn btn-like"

                     return (
                        <div key={image.id} className="details__container">
                           <div className="details__container--info">
                              <a href={image.user.links.html} className="author" target="_blank">
                                 <image src={image.user.profile_image.small} alt={image.user.name} className="author__image" />
                                 <span className="author__name" >
                                    {image.user.name}
                                 </span>
                              </a>
                              <time className="date" dateTime={image.created_at}>{date}</time>
                              <button className={liked} type="button" onClick={event => image.liked_by_user ? this.props.unlikedPhoto(image.id) : this.props.likedPhoto(image.id)}> {image.likes}</button>
                           </div>
                           <image
                              className="details__container--image"
                              src={image.urls.regular}
                              alt={image.description} />
                        </div>
                     )
                  }
               })
            }
         </div>
      )
   }
}

export default withRouter(ImagesModal)