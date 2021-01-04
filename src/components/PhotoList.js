import React from "react"
import { Link } from "react-router-dom"
import Masonry from "react-masonry-component"
import { setAccessTokenUnplash, listPhoto } from "../unsplash/unsplash.js"

let isResizeble = false

class PhotoList extends React.Component {
  constructor(props) {
    super(props)
    this.loadImages = this.loadImages.bind(this)
    this.pageScroll = this.pageScroll.bind(this)
    if (localStorage.getItem("token") === "undefined" || localStorage.getItem("token") === "" || !localStorage.getItem("token")) {
      this.setAccessToken()
    }
  }

  componentDidMount() {
    if (!isResizeble) {
      this.loadImages()
      isResizeble = true
    }

    window.addEventListener("scroll", this.pageScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.pageScroll)
  }

  setAccessToken() {
    const code = window.location.search.split("code=")[1]

    if (code) {
      setAccessTokenUnplash(code)
    }
  }

  loadImages() {
    const start = this.props.images.length + 1
    const images = listPhoto(start, localStorage.getItem("token"))
    images.then(img => this.props.addImages(img))
  }

  pageScroll() {
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ),
      scrollTop = window.pageYOffset,
      clientHeight = document.documentElement.clientHeight

    if (scrollHeight - scrollTop == clientHeight) {
      this.loadImages()
    }
  }

  render() {
    return (
      <div className="main-container">
        <Masonry className="list-photos">
          {
            this.props.images.map((img, i) => {
              let date = img.created_at[8] + img.created_at[9] + "." + img.created_at[5] + img.created_at[6] + "." + img.created_at[0] + img.created_at[1] + img.created_at[2] + img.created_at[3]
              let liked = (img.liked_by_user) ? "btn btn-like liked" : "btn btn-like"

              return (
                <div
                  key={img.id}
                  className="list-photos__item">
                  <img
                    src={img.urls.small}
                    className="list-photos__item--img"
                    alt={img.description} />
                  <div className="list-photos__item--stats">
                    <a
                      href={img.user.links.html}
                      className="author"
                      target="_blank">
                      <img
                        src={img.user.profile_image.small}
                        alt={img.user.first_name}
                        className="author-img" />
                      <span className="author__name" >
                        {img.user.first_name}
                      </span>
                    </a>
                    <time
                      className="date"
                      dateTime={img.created_at}>
                      {date}
                    </time>
                    <button
                      className={liked}
                      type="button"
                      onClick={event => img.liked_by_user ?
                        this.props.unlikedPhoto(img.id) :
                        this.props.likedPhoto(img.id)}>
                      {img.likes}
                    </button>
                    <Link
                      to={"/photos/" + i}
                      className="photo-detail">
                      <button className="btn btn-detail">
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
          onClick={this.loadImages}>
          Показать ещё
        </button>
      </div>
    )
  }
}

export default PhotoList