import { useState } from "react"
import Loader from "../components/Loader"
import Alert from "../components/Alert"
import axios from "axios"

const Register = () => {
  const [isAlert, setIsAlert] = useState({
    message: "",
    alert: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsAlert("")

    if (!user.name || !user.email || !user.password || !user.confirmPassword) {
      return setIsAlert({
        message: "Please fill all fields",
        alert: "alert-danger",
      })
    }
    if (user.password !== user.confirmPassword) {
      return setIsAlert({
        message: "Passwords are not match",
        alert: "alert-danger",
      })
    }
    setIsLoading(true)
    try {
      const { data } = await axios.post("/api/users/register", user)
      setIsLoading(false)
      localStorage.setItem("currentUser",JSON.stringify(data.user))
      setIsAlert({
        message: "User created successfully!",
        alert: "alert-success",
      })
    } catch (error) {
      setIsLoading(false)
      setIsAlert({
        message: error.response.data.message,
        alert: "alert-danger",
      })
    }
  }

  return (
    <div>
      <div className='row justify-content-center mt-5'>
        {isAlert.message ? <Alert message={isAlert.message} alert={isAlert.alert} /> : ""}
        <div className={`col-md-5 ${isAlert.message ? "" : "mt-5"}`}>
          {isLoading ? (
            <Loader />
          ) : (
            <div className='bs'>
              <h2 className='mb-4'>Register</h2>
              <form action='' id='registerForm' onSubmit={handleSubmit}>
                <input
                  type='text'
                  name='name'
                  value={user.name}
                  className='form-control mt-2'
                  placeholder='name'
                  onChange={handleChange}
                />
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
                <input
                  type='password'
                  name='confirmPassword'
                  value={user.confirmPassword}
                  className='form-control mt-2'
                  placeholder='confirm password'
                  onChange={handleChange}
                />
                <button
                  disabled={isLoading ? true : false}
                  type='submit'
                  className='btn btn-primary mt-3'
                >
                  Register
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Register
