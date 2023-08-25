const { Router } = require("express")
const router = Router()
const {
  bookRoom,
  getBookingsById,
  cancelBooking,
  getAllBookings,
} = require("../controllers/bookingController")

router.post("/room", bookRoom)
router.post("/getBookingsByUserId", getBookingsById)
router.post("/cancelBooking", cancelBooking)
router.get("/getAll", getAllBookings)

module.exports = router
