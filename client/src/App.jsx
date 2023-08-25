import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Booking from "./pages/Booking"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import PrivateRoute from "./pages/PrivateRoute"
import Admin from "./pages/Admin"
import IsAdmin from "./pages/isAdmin"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}>
              <Route path="/:fromDate/:toDate" element={<Home />}></Route>
          </Route>
          <Route path='/book/:roomId/:fromDate/:toDate' element={<PrivateRoute><Booking /></PrivateRoute>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/admin" element={<IsAdmin><Admin /></IsAdmin>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
