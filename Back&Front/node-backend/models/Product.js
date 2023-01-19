import mongoose from 'mongoose'

const PrductSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('prod', PrductSchema)
