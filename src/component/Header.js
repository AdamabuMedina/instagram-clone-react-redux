import React from "react"
import { Link, NavLink } from "react-router-dom"

const Header = (props) => {
   const { logOut, logIn } = props
   return (
      <header className="header">
         <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light">
               {
                  (localStorage.getItem("token") === "undefined" ||
                     localStorage.getItem("token") === "" ||
                     localStorage.getItem("token")) ?
                     <ul className="container-fluid">
                        <li className="navbar-brand">
                           <NavLink to="/" className="navbar-brand">Unsplash App</NavLink>
                        </li>
                        <li
                           className="navbar-brand"
                           onClick={() => logIn()}>
                           <Link to="/photos" className="btn btn-outline-secondary">Войти</Link>
                        </li>
                     </ul>
                     :
                     <div className="container-fluid">
                        <li className="navbar-brand">
                           <NavLink to="/" className="navbar-brand">Unsplash App</NavLink>
                        </li>
                        <li
                           className="navbar-brand"
                           onClick={() => logOut()}>
                           <Link to="/" className="btn btn-outline-secondary">Выйти</Link>
                        </li>
                     </div>
               }
            </nav>
         </div>
      </header>
   )
}

export default Header