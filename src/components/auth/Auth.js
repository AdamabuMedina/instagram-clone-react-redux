import {Component} from "react"
import {authenticationUrl} from "../../services/unsplash";

class Auth extends Component {
  componentDidMount() {
    location.assign(authenticationUrl)
  }

  render() {
    return (
      <div/>
    )
  }
}

export default Auth