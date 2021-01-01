import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { authenticationUrl, likeImage, unlikeImage } from "../unsplash/unsplash"
import { addImages, likedImage, logInUser, logOutUser, unlikedImage } from "../actions/action"
import { connect } from "react-redux"
import Header from "../component/Header"
import Images from "../component/Images"
import store from "../reducers/store"
import ImagesModal from "../component/ImagesModal"
import Auth from "../component/Auth"

const App = (props) => {
   const { addImages, images, likedImage, logInUser, logOutUser } = props

   const logIn = () => {
      window.location.assign(authenticationUrl)
      logInUser()
   }
   const logOut = () => {
      localStorage.clear("token")
      logOutUser()
   }

   const likeUp = id => {
      const currentState = store.getState()
      const targetElement = currentState.find(item => item.id === id)
      if (!targetElement.liked_by_user) {
         targetElement.liked_by_user = true
         targetElement.likes++
         likedImage()
         likeImage(targetElement.id, localStorage.getItem("token"))
      } else {
         targetElement.liked_by_user = false
         targetElement.likes--
         unlikedImage()
         unlikeImage(targetElement.id, localStorage.getItem("token"))
      }
   }

   return (
      <Switch>
         <Route exact path="/">
            <Header logIn={logIn} logOut={logOut} />
            <Auth logIn={logIn} />
            <Images images={images} addImages={addImages} likedImage={likeUp} />
            <ImagesModal images={images} addImages={addImages} likedImage={likeUp} unlikedImage={likeUp} />
         </Route>
         <Redirect to="/" />
      </Switch>
   )
}

const mapStateToProps = state => {
   return {
      images: state
   }
}

const mapDispatchToProps = dispatch => {
   return {
      addImages: (images) => dispatch(addImages(images)),
      likedImage: (id) => dispatch(likedImage(id)),
      unlikedImage: (id) => dispatch(unlikedImage(id)),
      logInUser: () => dispatch(logInUser()),
      logOutUser: () => dispatch(logOutUser())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)