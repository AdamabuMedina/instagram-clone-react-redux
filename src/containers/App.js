import React from "react"
import { Route, Switch } from "react-router-dom"
import { authenticationUrl } from "../unsplash/unsplash"
import { logInUser, logOutUser } from "../actions/action"
import { connect } from "react-redux"
import Header from "../component/Header"

const App = (props) => {
   const { addImages } = props

   const logIn = () => {
      window.location.assign(authenticationUrl)
      logInUser()
   }
   const logOut = () => {
      localStorage.clear("token")
      logOutUser()
   }

   return (
      <Switch>
         <Route exact path="/">
            <Header logIn={logIn} logOut={logOut} />
         </Route>
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
      logInUser: () => dispatch(logInUser()),
      logOutUser: () => dispatch(logOutUser())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)