import React from "react"
import { NavLink, Link } from "react-router-dom"

const Header = (props) => {
  const { logOut, logIn } = props

  return (
    <header className="header">
      <nav className="header__wrapper">
        {(localStorage.getItem("token") === "undefined" ||
          localStorage.getItem("token") === "" ||
          !localStorage.getItem("token")) ?
          <ul className="menu">
            <li className="menu-logo">
              <NavLink to="/">UNSPLASH APP</NavLink>
            </li>
            <li onClick={() => logIn()} className="menu-auth"><Link to="/photos">Войти</Link></li>
          </ul>
          :
          <ul className="menu">
            <li className="menu-logo"><NavLink to="/photos">UNSPLASH APP</NavLink></li>
            <li onClick={() => logOut()} className="menu-auth"><Link to="/">Выйти</Link></li>
          </ul>
        }
      </nav>
    </header>
  )
}

export default Header
