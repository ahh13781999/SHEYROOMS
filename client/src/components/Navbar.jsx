import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"))
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("currentUser")
    navigate("/", { replace: true })
  }
  return (
    <nav className='navbar navbar-expand-lg px-4'>
      <Link className='navbar-brand' to={"/"}>
        SHEYROOMS
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNav'
        aria-controls='navbarNav'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav'>
          {user ? (
            <div className='dropdown' style={{ marginRight: "35px" }}>
              <button
                className='btn btn-secondary dropdown-toggle'
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                style={{ backgroundColor: "black"}}
              >
                {user.name.toUpperCase()}
              </button>
              <ul
                className='dropdown-menu'
                style={{ minWidth: 0, fontSize: "15px" }}
              >
                <li>
                  <Link className='dropdown-item' to='profile'>
                    Profile
                  </Link>
                </li>
                <li>
                  <a onClick={logout} className='dropdown-item' href='#'>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <li className='nav-item'>
                <Link className='nav-link' to='/register'>
                  Register
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/login'>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
