import React from "react"
import { connect } from "react-redux"
import { Switch, Route, Redirect } from "react-router-dom"
import PhotoList from "../components/PhotoList.js"
import PhotoDetails from "../components/PhotoDetails.js"
import Header from "../components/Header.js"
import Auth from "../components/Auth.js"
import { likePhoto, unlikePhoto, authenticationUrl } from "../unsplash/unsplash.js"
import { addImages, likedPhoto, unlikedPhoto } from "../actions/actions.js"

const App = (props) => {
  const { images, addImages, likedPhoto, unlikedPhoto, currentState } = props

  const likeUpdate = id => {
    const targetElement = currentState.find(item => item.id === id)
    if (!targetElement.liked_by_user) {
      targetElement.liked_by_user = true
      targetElement.likes++
      likedPhoto()
      likePhoto(targetElement.id, localStorage.getItem("token"))
    } else {
      targetElement.liked_by_user = false
      targetElement.likes--
      unlikedPhoto()
      unlikePhoto(targetElement.id, localStorage.getItem("token"))
    }
  }

  return (
    <Switch>
      <Route exact path="/" component={Auth} />
      <Route exact path="/photos">
        <Header />
        <PhotoList images={images} addImages={addImages} likedPhoto={likeUpdate} unlikedPhoto={likeUpdate} />
      </Route>
      <Route path="/photos/:id">
        <Header />
        <PhotoDetails images={images} addImages={addImages} likedPhoto={likeUpdate} unlikedPhoto={likeUpdate} />
      </Route>
      <Redirect to="/photos" />
    </Switch>
  )
}

const mapStateToProps = state => ({
  images: state,
  currentState: state

})

const mapDispatchToProps = dispatch => ({
  addImages: (images) => dispatch(addImages(images)),
  likedPhoto: (id) => dispatch(likedPhoto(id)),
  unlikedPhoto: (id) => dispatch(unlikedPhoto(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)