import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    info: {
      type: Object,
      required: true,
    },
    desiredDate: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Order', OrderSchema)
