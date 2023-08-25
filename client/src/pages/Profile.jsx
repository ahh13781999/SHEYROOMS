import { Tabs, Tag } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader"

const items = [
  {
    key: "1",
    label: "Profile",
    children: <MyProfile />,
  },
  {
    key: "2",
    label: "Bookings",
    children: <MyBookings />,
  },
]
const Profile = () => {
  return (
    <div className='mx-3 mt-3 container'>
      <Tabs defaultActiveKey='1' items={items} />
    </div>
  )
}

export default Profile

export function MyProfile() {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("currentUser"))
  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [])

  const { id, name, email, isAdmin } = user

  return (
    <div>
      <h1>My Profile</h1>
      <br />
      <p>
        <b>Name:</b>{" "}
        <Tag bordered={false} color='purple'>
          {name}
        </Tag>
      </p>
      <p>
        <b>Email:</b>{" "}
        <Tag bordered={false} color='blue'>
          {email}
        </Tag>
      </p>
      <p>
        <b>Is Admin:</b>{" "}
        {isAdmin ? (
          <Tag bordered={false} color='green'>
            {"Yes"}
          </Tag>
        ) : (
          <Tag bordered={false} color='red'>
            {"No"}
          </Tag>
        )}
      </p>
    </div>
  )
}

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"))
  const { id, name, email, isAdmin } = user

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getBookingsById = async () => {
      setLoading(true)
      try {
        const { data: bookings } = await axios.post(
          "/api/booking/getBookingsByUserId",
          { userId: id }
        )
        setBookings(bookings)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(error.data.response)
      }
    }
    getBookingsById()
  }, [])

  const cancelBooking = async (bookingId, roomId) => {
    setLoading(true)
    try {
      const { data } = await axios.post("/api/booking/cancelBooking", {
        bookingId,
        roomId,
      })
      console.log(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      setError(error.response.data.message)
    }
  }
  return (
    <div>
      <div className='row'>
        <div className='col-md-6'>
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              const {
                _id: bookingId,
                roomId: { _id: roomId, name },
                fromDate,
                toDate,
                status,
                totalAmount,
              } = booking
              return (
                <div key={bookingId} className='bs'>
                  <h1>{name}</h1>
                  <p>
                    <b>BookingId:</b> {bookingId}
                  </p>
                  <p>
                    <b>Check In:</b>{" "}
                    {new Date(fromDate).toLocaleDateString("en-US")}
                  </p>
                  <p>
                    <b>Check Out:</b>{" "}
                    {new Date(toDate).toLocaleDateString("en-US")}
                  </p>
                  <p>
                    <b>Amount:</b>{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(totalAmount)}
                  </p>
                  <p>
                    <b>Status:</b>{" "}
                    {status === "booked" ? (
                      <Tag color='green'>{"CONFIRMED"}</Tag>
                    ) : (
                      <Tag color='red'>{"CANCELLED"}</Tag>
                    )}
                  </p>
                  {status !== "cancelled" && (
                    <div>
                      <button
                        onClick={() => cancelBooking(bookingId, roomId)}
                        className='btn btn-primary'
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
