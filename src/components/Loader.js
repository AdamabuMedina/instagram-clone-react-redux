import React from "react"
import { Loading } from "./Styled"

export const Loader = () => {
   return (
      <Loading>
         <div className="lds-ellipsis">
            <div></div><div></div><div></div><div></div>
         </div>
      </Loading>
   )
}