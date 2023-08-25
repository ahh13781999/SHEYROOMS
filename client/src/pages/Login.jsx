import { useState } from "react"
import Loader from "../components/Loader"
import Alert from "../components/Alert"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()

  const [isAlert, setIsAlert] = useState({
    message: "",
    alert: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsAlert("")

    if (!user.email || !user.password) {
      return setIsAlert({
        message: "Please fill all the fields",
        alert: "alert-danger",
      })
    }
    setIsLoading(true)
    try {
      const { data } = await axios.post("/api/users/login", user)
      setIsLoading(false)
      localStorage.setItem("currentUser", JSON.stringify(data.user))
      setIsAlert({
        message: "User logged in successfully!",
        alert: "alert-success",
      })

      navigate("/", { replace: true })
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      setIsAlert({
        message: error.response.data.message,
        alert: "alert-danger",
      })
    }
  }

  return (
    <div>
      <div className='row justify-content-center mt-5'>
        {isAlert.message ? (
          <Alert message={isAlert.message} alert={isAlert.alert} />
        ) : (
          ""
        )}
        <div className={`col-md-5 ${isAlert.message ? "" : "mt-5"}`}>
          {isLoading ? (
            <Loader />
          ) : (
            <div className='bs'>
              <h2 className='mb-4'>Login</h2>
              <form id='loginForm' onSubmit={handleSubmit}>
                <input
                  type='email'
                  name='email'
                  value={user.email}
                  className='form-control mt-2'
                  placeholder='email'
                  onChange={handleChange}
                />
                <input
                  type='password'
                  name='password'
                  value={user.password}
                  className='form-control mt-2'
                  placeholder='password'
                  onChange={handleChange}
                />
                <button
                  disabled={isLoading ? true : false}
                  type='submit'
                  className='btn btn-primary mt-3'
                >
                  Login
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
