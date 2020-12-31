import React from "react"

const Auth = (props) => {
   const { logIn } = props
   return (
      <div className="d-grid gap-2 col-6 mx-auto">
         <button
            className="btn btn-secondary"
            type="button"
            onClick={logIn}
         >
            Войти в аккаунт</button>
      </div>
   )
}

export default Auth