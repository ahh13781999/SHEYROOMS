const { Router } = require("express")
const router = Router()

const {
  getAllRooms,
  getSingleRoom,
  addRoom
} = require("../controllers/roomController")

router.get("/all", getAllRooms)
router.get("/:roomId", getSingleRoom)
router.post("/addRoom",addRoom)

module.exports = router
