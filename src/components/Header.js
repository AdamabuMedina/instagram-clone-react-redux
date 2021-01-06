import React, { Component } from "react"
import { NavLink, Link } from "react-router-dom"

class Header extends Component {
  render() {
    return (
      <header className="header" >
        <nav className="header__wrapper">
          <ul className="menu">
            <li className="menu-logo">
              <NavLink to="/">UNSPLASH APP</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
