const { connect } = require("mongoose")

const connectDB = async (uri) => {
  try {
    await connect(uri)
  } catch (error) {
    console.log("Something went wrong try again latter")
  }
}

module.exports = connectDB
