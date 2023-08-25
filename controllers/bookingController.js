const Book = require("../models/Book")
const Room = require("../models/Room")
const Stripe = require("stripe")
const stripe = new Stripe(
  "sk_test_51NfhA0SJsvgLsDSpNaLyNOycZUjg0dlysWcP8NkolsNcuOQC47sfyoNc42a3WjWZ6r6CNlJVphUL4FFPlpKjXLKz00a1jwtv86"
)

const bookRoom = async (req, res) => {
  const { roomId, userId, toDate, fromDate, totalAmount, totalDays, token } =
    req.body

  try {
    // const customer = await stripe.customers.create({
    //   email: token.email,
    //   source: token.id,
    // })
    // const payment = await stripe.paymentIntents.create({
    //   amount: totalAmount * 100,
    //   customer: customer.id,
    //   currency: "usd",
    //   receipt_email: token.email,
    // })
    // res.send("Payment was successful, You've booked the room")

    // if (payment) {
    // }

    const booking = await Book.create({
      roomId,
      userId,
      toDate,
      fromDate,
      totalAmount,
      totalDays,
      transactionId: "111",
      status: "booked",
    })

    const room = await Room.findById(roomId)
    room.currentBookings.push({
      bookingId: booking._id,
      toDate,
      fromDate,
      userId,
      status: booking.status,
    })
    await room.save()

    return res.status(200).send(booking)
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

const getBookingsById = async (req, res) => {
  const { userId } = req.body

  try {
    const bookings = await Book.find({ userId }).populate("roomId", "name")
    return res.json(bookings)
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

const cancelBooking = async (req, res) => {
  const { bookingId, roomId } = req.body

  try {
    const bookedRoom = await Book.findOne({ _id: bookingId })
    bookedRoom.status = "cancelled"
    await bookedRoom.save()

    const room = await Room.findOne({ _id: roomId })
    const bookings = room.currentBookings
    const modifiedBookings = bookings.filter(
      (booking) => booking.bookingId.toString() !== bookingId
    )
    room.currentBookings = modifiedBookings
    await room.save()

    return res
      .status(200)
      .json({ message: "Your booking got canceled successfully" })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Book.find({}).populate("userId","name").populate("roomId","name")
    return res.status(200).json(bookings)
  } catch (error) {
    return res.status(400).json({message: error})
  }
}

module.exports = {
  bookRoom,
  getBookingsById,
  cancelBooking,
  getAllBookings,
}
