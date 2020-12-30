import React, {Component} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import {unsplashGetUser, userAccessToken} from "../../services/unsplash";
import {getUserName} from "../../actions/action";
import {connect} from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);
    this.getUserName = this.getUserName.bind(this)

    if (!localStorage.getItem("token")) {
      userAccessToken(window.location.search.split("code=")[1]);
    }
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName() {
    unsplashGetUser().then((user) => {
      this.props.getUserName(user);
    });
  }

  render() {
    return (
      <header className="navbar sticky-top navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <FontAwesomeIcon className="mr-2" icon={faCamera} size="2x"/>
          </Link>
          <div className="navbar-nav ml-auto">
            {this.props.user.username}
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({photos: state.photos, user: state.user})
const mapDispatchToProps = (dispatch) => {
  return {
    getUserName: (user) => dispatch(getUserName(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)