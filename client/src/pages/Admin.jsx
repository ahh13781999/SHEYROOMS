import { useEffect, useState } from "react"
import { Tabs } from "antd"
import axios from "axios"
import Loader from "../components/Loader"

const items = [
  {
    key: "1",
    label: "Bookings",
    children: <Bookings />,
  },
  {
    key: "2",
    label: "Rooms",
    children: <Rooms />,
  },
  {
    key: "3",
    label: "Add Rooms",
    children: <AddRooms />,
  },
  {
    key: "4",
    label: "Users",
    children: <Users />,
  },
]

const Admin = () => {
  return (
    <div className='mx-3 my-3 container bs'>
      <h1>Admin Panel</h1>
      <Tabs defaultActiveKey='1' items={items} />
    </div>
  )
}

export default Admin

export function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get("/api/booking/getAll")
        setBookings(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(error)
        console.log(error)
      }
    }
    fetchBookings()
  }, [])
  return (
    <div className='row'>
      <div className='col-md-10'>
        <h1>Bookings</h1>
        {loading && <Loader />}
        <table className='table table-bordered table-dark'>
          <thead className='bs'>
            <tr>
              <th>Booking Id</th>
              <th>User</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings &&
              bookings.map((booking) => {
                const {
                  _id,
                  userId: { name: userName },
                  roomId: { name: roomName },
                  fromDate,
                  toDate,
                  status,
                } = booking
                return (
                  <tr key={_id}>
                    <td>{_id}</td>
                    <td>{userName}</td>
                    <td>{roomName}</td>
                    <td>{new Date(fromDate).toLocaleDateString("en-US")}</td>
                    <td>{new Date(toDate).toLocaleDateString("en-US")}</td>
                    <td>{status}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function Rooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get("/api/rooms/all")
        setRooms(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(error)
        console.log(error)
      }
    }
    fetchRooms()
  }, [])
  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Rooms</h1>
        {loading && <Loader />}
        <table className='table table-bordered table-dark'>
          <thead className='bs'>
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Per Day</th>
              <th>Max Count</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms &&
              rooms.map((room) => {
                const { _id, name, type, rentPerDay, maxCount, phoneNumber } =
                  room
                return (
                  <tr key={_id}>
                    <td>{_id}</td>
                    <td>{name}</td>
                    <td>{type}</td>
                    <td>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(rentPerDay)}
                    </td>
                    <td>{maxCount}</td>
                    <td>{phoneNumber}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AddRooms() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [room, setRoom] = useState({
    name: "",
    rentPerDay: "",
    maxCount: "",
    description: "",
    phoneNumber: "",
    type: "",
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
  })

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value })
  }

  const addRoom = async () => {
    const newRoom = { ...room, imageUrl: [room.imageUrl1,room.imageUrl2,room.imageUrl3]}
    setLoading(true)
    try {
      const { data } = await axios.post("/api/rooms/addRoom", { ...newRoom })
      setLoading(false)
      console.log(data)
    } catch (error) {
      setLoading(false)
      setError(error)
    }
  }

  return (
  <div className='row gap-4'>
  {loading && <Loader/>}
      <div className='col-md-5'>
        <input
          type='text'
          name='name'
          onChange={(e) => handleChange(e)}
          value={room.name}
          className='form-control mt-2'
          placeholder='room name'
        />
        <input
          type='number'
          name='rentPerDay'
          onChange={(e) => handleChange(e)}
          value={room.rentPerDay}
          className='form-control mt-2'
          placeholder='rent per day'
        />
        <input
          type='number'
          name='maxCount'
          onChange={(e) => handleChange(e)}
          value={room.maxCount}
          className='form-control mt-2'
          placeholder='max count'
        />
        <input
          type='text'
          name='description'
          onChange={(e) => handleChange(e)}
          value={room.description}
          className='form-control mt-2'
          placeholder='description'
        />
        <input
          type='number'
          name='phoneNumber'
          onChange={(e) => handleChange(e)}
          value={room.phoneNumber}
          className='form-control mt-2'
          placeholder='phone number'
        />
      </div>
      <div className='col-md-5'>
        <input
          type='text'
          name='type'
          onChange={(e) => handleChange(e)}
          value={room.type}
          className='form-control mt-2'
          placeholder='type'
        />
        <input
          type='text'
          name='imageUrl1'
          onChange={(e) => handleChange(e)}
          value={room.imageUrl1}
          className='form-control mt-2'
          placeholder='image url 1'
        />
        <input
          type='text'
          name='imageUrl2'
          onChange={(e) => handleChange(e)}
          value={room.imageUrl2}
          className='form-control mt-2'
          placeholder='image url 2'
        />
        <input
          type='text'
          name='imageUrl3'
          onChange={(e) => handleChange(e)}
          value={room.imageUrl3}
          className='form-control mt-2'
          placeholder='image url 3'
        />
      </div>
      <div className='my-2'>
        <button onClick={() => addRoom()} className='btn btn-primary'>
          Add Room
        </button>
      </div>
    </div>
  )
}

export function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get("/api/users/getAll")
        setUsers(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(error)
        console.log(error)
      }
    }
    fetchUsers()
  }, [])
  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Rooms</h1>
        {loading && <Loader />}
        <table className='table table-bordered table-dark'>
          <thead className='bs'>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((room) => {
                const { _id, name, email, isAdmin } = room
                return (
                  <tr key={_id}>
                    <td>{_id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{isAdmin ? "Yes" : "No"}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
