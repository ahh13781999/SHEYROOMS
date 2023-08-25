import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import Loader from "../components/Loader"
import Alert from "../components/Alert"
import moment from "moment"
import StripeCheckout from "react-stripe-checkout"

const Booking = () => {
  const [isAlert, setIsAlert] = useState({
    message: "",
    alert: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [room, setRoom] = useState("")

  const { roomId, fromDate, toDate } = useParams()

  useEffect(() => {
    const getSingleRoom = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get(`/api/rooms/${roomId}`)
        setRoom(data)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setIsAlert(error.response.data.message)
      }
    }
    getSingleRoom()
  }, [])

  const { name, imageUrls, maxCount, rentPerDay } = room

  const totalDays = moment(toDate).diff(moment(fromDate), "days")
  const totalAmount = totalDays * rentPerDay

  const clickHandler = async () => {
    setIsAlert("")
    const bookingDetails = {
      roomId,
      userId: JSON.parse(localStorage.getItem("currentUser")).id,
      fromDate,
      toDate,
      totalDays,
      totalAmount,
    }

    try {
      setIsLoading(true)
      const { data } = await axios.post("/api/booking/room", bookingDetails)
      setIsLoading(false)
      console.log(data)
      setIsAlert({
        alert: "alert-success",
        message: "The room booked successfully! ",
      })
    } catch (error) {
      setIsLoading(false)
      setIsAlert({
        alert: "alert-warning",
        message: error.response.data.message,
      })
    }
  }

  return (
    <div className='m-5'>
      {isAlert.message ? (
        <Alert alert={isAlert.alert} message={isAlert.message} />
      ) : (
        ""
      )}
      {isLoading ? (
        <Loader />
      ) : room ? (
        <div className='row justify-content-center mt-5 bs'>
          <div className='col-md-5'>
            <h1>{name}</h1>
            <img src={imageUrls[0]} alt={name} className='smallImg' />
          </div>
          <div className='col-md-6'>
            <div style={{ textAlign: "right" }}>
              <h1 style={{ color: "gray" }}>Booking Details</h1>
              <hr />
              <p>
                Name:{" "}
                <span style={{ fontSize: "13px" }}>
                  {JSON.parse(localStorage.getItem("currentUser")).name}
                </span>
              </p>
              <p>
                From Date: <span style={{ fontSize: "13px" }}>{fromDate}</span>
              </p>
              <p>
                To Date: <span style={{ fontSize: "13px" }}>{toDate}</span>
              </p>
              <p>
                Max Count: <span style={{ fontSize: "13px" }}>{maxCount}</span>
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <h1 style={{ color: "gray" }}>Amount</h1>
              <hr />
              <p>
                Total Days:{" "}
                <span style={{ fontSize: "13px" }}>{totalDays}</span>
              </p>
              <p>
                Rent Per Day:{" "}
                <span style={{ fontSize: "13px" }}>${rentPerDay}</span>
              </p>
              <p>
                Total Amount:{" "}
                <span style={{ fontSize: "13px" }}>${totalAmount}</span>
              </p>
            </div>
            <div style={{ float: "right" }}>
              {/* <StripeCheckout
                amount={totalAmount * 100}
                currency='USD'
                token={onToken}
                stripeKey='pk_test_51NfhA0SJsvgLsDSpHqOmwztCQmCkUm6MQZxhSfRMh5yNzYgV3p8Yczkya7L8nnucbfesLLJZTTP6XymFiwvq3rK200gYhvAkpW'
              ></StripeCheckout> */}
              <button
                onClick={() => clickHandler()}
                disabled={isLoading ? true : false}
                className='btn btn-primary'
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Alert
          message={"Sorry! the room doesn't exists!"}
          alert={"alert-warning"}
        />
      )}
    </div>
  )
}

export default Booking
