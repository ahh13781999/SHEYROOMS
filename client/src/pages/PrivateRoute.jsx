import React from "react"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("currentUser")
  
  if (user) {
    return children
  } else {
    return <Navigate to={"/login"} replace={true} />
  }
}

export default PrivateRoute
