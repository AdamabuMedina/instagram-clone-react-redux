import React from "react"
import { NavLink, withRouter } from "react-router-dom"
import { setAccessTokenUnplash, listPhoto } from "../unsplash/unsplash.js"

class PhotoDetails extends React.Component {
  constructor(props) {
    super(props)
    this.loadImages = this.loadImages.bind(this)

    if (localStorage.getItem("token") === "undefined" ||
      localStorage.getItem("token") === "" ||
      !localStorage.getItem("token")) {
      this.setAccessToken()
    }
  }

  componentDidMount() {
    this.loadImages()
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

  render() {
    return (
      <div className="main-container">
        <NavLink to="/photos" className="back-link">Назад</NavLink>
        {
          this.props.images.map((img, i) => {
            if (i == this.props.match.params.id) {
              let date = img.created_at[8] + img.created_at[9] + "." + img.created_at[5] + img.created_at[6] + "." + img.created_at[0] + img.created_at[1] + img.created_at[2] + img.created_at[3]
              let liked = (img.liked_by_user) ?
                "btn btn-like liked" : "btn btn-like"
              return (
                <div
                  key={img.id}
                  className="details-container">
                  <div
                    className="details-container--info">
                    <a
                      href={img.user.links.html}
                      className="author"
                      target="_blank">
                      <img
                        src={img.user.profile_image.small}
                        alt={img.user.name}
                        className="author-img" />
                      <span className="author-name" >
                        {img.user.name}
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
                  </div>
                  <img
                    className="details-container--img"
                    src={img.urls.regular}
                    alt={img.description} />
                </div>
              )
            }
          })
        }
      </div>
    )
  }
}

export default withRouter(PhotoDetails)