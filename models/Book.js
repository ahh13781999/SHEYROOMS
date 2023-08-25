const { Schema, model, Types } = require("mongoose")

const BookSchema = new Schema(
  {
    roomId: {
      type: Types.ObjectId,
      ref: "Room",
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    totalDays: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["booked", "free", "unavailable", "cancelled"],
      required: true
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model("Book", BookSchema)
