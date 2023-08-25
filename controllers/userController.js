const User = require("../models/User")

const register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const emailAlreadyExists = await User.findOne({ email })
    if (emailAlreadyExists) {
      return res
        .status(400)
        .json({ message: "Email Already exists! use another one" })
    }
    const user = await User.create({ name, email, password })
    return res
      .status(200)
      .json({ user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "Wrong email or password" })
    }

    const isPasswordMatch = await user.comparePassword(password)

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Wrong email or password" })
    }

    return res
      .status(200)
      .json({ user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
    return res.status(200).json(users)
  } catch (error) {
    return res.status(200).json({ message: error })
  }
}

module.exports = {
  register,
  login,
  getAllUsers
}
