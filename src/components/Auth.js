import React from "react"

const Auth = (props) => {
  const { logIn } = props
  return (
    <div className="main-container">
      <button
        className="btn btn-load"
        type="button"
        onClick={logIn}>
        Авторизация
        </button>
    </div>
  )
}

export default Auth