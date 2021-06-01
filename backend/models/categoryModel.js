import mongoose from "mongoose"

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Category = mongoose.model("categories", categorySchema)

export default Category
