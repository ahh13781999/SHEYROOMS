const Room = require("../models/Room")

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({})
    return res.status(200).json(rooms)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const getSingleRoom = async (req, res) => {
  try {
    const { roomId } = req.params
    const room = await Room.findById(roomId)
    return res.status(200).json(room)
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
}

const addRoom = async (req, res) => {
  try {
    const {
      name,
      rentPerDay,
      maxCount,
      description,
      phoneNumber,
      type,
      imageUrl
    } = req.body
    const room = new Room()
    room.name = name
    room.rentPerDay = rentPerDay,
    room.maxCount = maxCount,
    room.description = description,
    room.phoneNumber = phoneNumber,
    room.type = type,
    room.imageUrl = imageUrl
    await room.save()
    return res.status(200).json({ message: "Room added successful1ly" })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

module.exports = {
  getAllRooms,
  getSingleRoom,
  addRoom
}
