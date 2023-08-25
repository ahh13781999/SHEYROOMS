import { Navigate } from "react-router-dom"

const IsAdmin = ({ children }) => {
  const { isAdmin } = JSON.parse(localStorage.getItem("currentUser"))

  if (isAdmin) {
    return children
  } else {
    return <Navigate to={'/'} replace={true} />
  }
}

export default IsAdmin
