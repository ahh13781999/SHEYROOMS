const express = require("express")
const app = express()

const connectDB = require("./db")
const roomRouter = require("./routes/roomRoutes")
const userRouter = require("./routes/userRoutes")
const bookingRouter = require("./routes/bookingRoutes")

app.use(express.json())

app.use("/api/rooms", roomRouter)
app.use("/api/users", userRouter)
app.use("/api/booking", bookingRouter)

const port = process.env.PORT || 5000

const Start = async () => {
  try {
    await connectDB("mongodb://0.0.0.0:27017/sheyrooms")
    app.listen(port, () => console.log(`Server running on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}
Start()
