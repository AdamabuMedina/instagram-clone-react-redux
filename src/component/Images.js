import React, { Component } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-component"
import { listImage, setAccessTokenUnplash } from "../unsplash/unsplash";

let size = false

class Images extends Component {
   constructor(props) {
      super(props)
      this.loadImages = this.loadImages.bind(this)
      this.pageScroll = this.pageScroll.bind(this)

      if (localStorage.getItem("token") === "undefined" ||
         localStorage.getItem("token") === "" ||
         !localStorage.getItem("token")) {
         this.setAccessToken()
      }
   }

   componentDidMount() {
      if (!size) {
         this.loadImages()
         size = true
      }

      window.addEventListener("scroll", this.pageScroll)
   }

   componentWillUnmount() {
      window.removeEventListener("scroll", this.pageScroll)
   }

   setAccessToken() {
      const code = window.location.search.split("code=")[1];

      if (code) {
         setAccessTokenUnplash(code)
      }
   }

   loadImages() {
      const start = this.props.images.length + 1
      const images = listImage(start, localStorage.getItem("token"))
      images.then(image => this.props.addImages(image))
   }

   pageScroll() {
      let scrollHeight = Math.max(
         document.body.scrollHeight, document.documentElement.scrollHeight,
         document.body.offsetHeight, document.documentElement.offsetHeight,
         document.body.clientHeight, document.documentElement.clientHeight
      ),
         scrollTop = window.pageYOffset,
         clientHeight = document.documentElement.clientHeight;

      if (scrollHeight - scrollTop === clientHeight) {
         this.loadImages();
      }
   }

   render() {
      return (
         <div className="container">
            <Masonry>
               {
                  this.props.images.map((image, i) => {
                     let date = `${image.created_at[8]}${image.created_at[9]}.${image.created_at[5]}${image.created_at[6]}.${image.created_at[0]}${image.created_at[1]}${image.created_at[2]}${image.created_at[3]}`
                     let liked = (image.liked_by_user) ? "btn btn-like liked" : "btn btn-like"
                     return (
                        <div
                           key={image.id}
                           className="list-images">
                           <img
                              className="list-img"
                              src={image.urls.small}
                              alt={image.description} />
                           <div
                              className="list-stats">
                              <a
                                 href={image.user.links.html}
                                 className="author">
                                 <img
                                    src={image.user.profile_image.small}
                                    alt={image.user.first_name} className="author-img" />
                                 <span className="author-name" >
                                    {image.user.first_name}
                                 </span>
                              </a>
                              <time
                                 className="date"
                                 dateTime={image.created_at}>
                                 {date}
                              </time>
                              <button
                                 className={liked}
                                 type="button"
                                 onClick={event => image.liked_by_user ? this.props.unlikedPhoto(image.id) :
                                    this.props.likedPhoto(image.id)}>
                                 {image.likes}
                              </button>
                              <Link
                                 to={"/" + i}
                                 className="image-detail">
                                 <button
                                    className="btn btn-detail">
                                    Подробнее
                                 </button>
                              </Link>
                           </div>
                        </div>
                     )
                  })
               }
            </Masonry>
            <button
               className="btn btn-load"
               type="button"
               onClick={this.loadImages}
            >
               Загрузить еще
            </button>
         </div>
      )
   }
}

export default Images