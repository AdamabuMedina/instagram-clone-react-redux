import {Link} from "react-router-dom";
import {connect} from "react-redux";
import tokenKey from "../../config.json"
import InstagramIcon from "../../services/svg";
import auth from "../../services/authService";

const Header = ({user}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <InstagramIcon/>
                </Link>
                <div className="navbar-nav ml-auto">
                    {
                        user.id && (
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
                                    className="btn btn-dark btn-lg"
                                    onClick={() => {
                                        localStorage.removeItem(tokenKey);
                                        window.location = "/";
                                    }}
                                >
                                    Выйти
                                </button>
                            </div>
                        )
                    }
                    {!user.id && (
                        <div className="d-flex py-3 py-sm-0">
                            <button
                                className="btn btn-dark btn-lg"
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
        </nav>
    )
}

const mapStateToProps = state => ({
    user: state.user.authUser
})

export default connect(mapStateToProps)(Header)