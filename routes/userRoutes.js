const { Router } = require("express")
const { register,login, getAllUsers } = require("../controllers/userController")
const router = Router()

router.post("/login", login)
router.post("/register", register)
router.get("/getAll", getAllUsers)

module.exports = router