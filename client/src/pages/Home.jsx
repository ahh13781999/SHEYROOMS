import { useState, useEffect } from "react"
import axios from "axios"
import Room from "../components/Room"
import Loader from "../components/Loader"
import Alert from "../components/Alert"
import { DatePicker } from "antd"
const { RangePicker } = DatePicker
import moment from "moment"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const [rooms, setRooms] = useState([])
  const [duplicateRooms, setDuplicateRooms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAlert, setIsAlert] = useState(false)
  const [dates, setDates] = useState({
    fromDate: "",
    toDate: "",
  })
  const [filteredRooms, setFilteredRooms] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [type, setType] = useState("all")

  useEffect(() => {
    const getRooms = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get("/api/rooms/all")
        setRooms(data)
        setDuplicateRooms(data)
        setIsLoading(false)
      } catch (error) {
        setIsAlert(true)
        setIsLoading(false)
      }
    }
    getRooms()
  }, [])

  const navigate = useNavigate()

  const filterByDate = (date) => {
    const selectedFromDate = moment(date[0]["$d"]).format("MM-DD-YYYY")
    const selectedToDate = moment(date[1]["$d"]).format("MM-DD-YYYY")

    setDates({
      fromDate: selectedFromDate,
      toDate: selectedToDate,
    })

    isRoomAvailable(selectedFromDate, selectedToDate)

    navigate(`/${selectedFromDate}/${selectedToDate}`)
  }

  const isRoomAvailable = (selectedFromDate, selectedToDate) => {
    for (const room of rooms) {
      if (room.currentBookings.length > 0) {
        for (const booking of room.currentBookings) {
          const { fromDate, toDate } = booking
          if (
            (fromDate >= selectedFromDate && toDate <= selectedToDate) ||
            (fromDate < selectedFromDate && toDate > selectedToDate) ||
            (selectedFromDate >= fromDate && selectedFromDate <= toDate) ||
            (selectedToDate >= fromDate && selectedToDate <= toDate)
          ) {
            room.alreadyBooked = true
          }
        }
      }
    }
  }

  const filterBySearch = () => {
    setIsLoading(true)
    const filteredRooms = duplicateRooms.filter((room) => {
      return room.name.toLowerCase().includes(searchKey.toLowerCase())
    })
    setRooms(filteredRooms)
    setIsLoading(false)
  }

  const filterByType = (e) => {
    if (e !== "all") {
      const filteredRooms = duplicateRooms.filter((room) => {
        return room.type.toLowerCase() === e.toLowerCase()
      })
      setRooms(filteredRooms)
    } else {
      setRooms(rooms)
    }
  }

  return (
    <div className='container'>
      {isAlert ? (
        <Alert
          message={"Something went wrong! try again later"}
          alert={"alert-warning"}
        />
      ) : (
        <>
          <div className='row mt-5 bs d-flex justify-content-between'>
            <div className='col-md-3'>
              <RangePicker
                className='h-100 py-2'
                format='DD-MM-YYYY'
                onChange={filterByDate}
              />
            </div>
            <div className='col-md-5'>
              <input
                type='search'
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                onKeyUp={filterBySearch}
                className='form-control h-100 py-2'
                placeholder='Search rooms...'
              />
            </div>
            <div className='col-md-3'>
              <select
                value={type}
                onChange={(e) => filterByType(e.target.value)}
                className='form-select h-100 py-2'
              >
                <option value='all'>All</option>
                <option value='deluxe'>Deluxe</option>
                <option value='non-deluxe'>Non deluxe</option>
              </select>
            </div>
          </div>
          <div className='row justify-content-center my-5'>
            {isLoading ? (
              <Loader />
            ) : (
              rooms.map((room) => {
                return (
                  <div key={room._id} className='col-md-9 mt-2'>
                    <Room
                      {...room}
                      fromDate={dates.fromDate}
                      toDate={dates.toDate}
                    />
                  </div>
                )
              })
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Home
