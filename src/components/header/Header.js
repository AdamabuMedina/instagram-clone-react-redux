import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import auth from "../../services/authService";
import { tokenKey } from "../../config.json";

const Header = ({ user }) => {
  return (
    <nav className="navbar sticky-top navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FontAwesomeIcon className="mr-2" icon={faCamera} size="2x" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <div className="navbar-nav ml-auto">
            {user.id && (
              <div className="d-flex py-3 py-sm-0">
                <img
                  className="rounded-circle mr-2"
                  src={user.profile_image.small}
                  alt={user.name}
                  width="40"
                  height="40"
                />
                <span className="navbar-text">{user.name}</span>
                <button
                  className="btn btn-dark ml-auto ml-sm-4"
                  onClick={() => {
                    localStorage.removeItem(tokenKey);
                    window.location = "/";
                  }}
                >
                  Выйти
                </button>
              </div>
            )}
            {!user.id && (
              <div className="d-flex py-3 py-sm-0">
                <button
                  className="btn btn-dark ml-auto ml-sm-4"
                  onClick={() => {
                    window.location = auth.getAuthUrl();
                  }}
                >
                  Войти
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  user: state.user.authUser
});

export default connect(mapStateToProps)(Header);
