const { Schema, model } = require("mongoose")
const { genSalt, hash, compare } = require("bcryptjs")

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre("save", async function () {
  const salt = await genSalt(10)
  this.password = await hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (enteredPassword) {
  const isPasswordMatch = await compare(enteredPassword, this.password)
  return isPasswordMatch
}

module.exports = model("User", UserSchema)
