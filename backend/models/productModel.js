import mongoose from "mongoose"

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId, //this shows that the feild is an object.
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

const skuSchema = mongoose.Schema(
  {
    sku: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: String, require: true },
    color: { type: String, require: true },
    size: { type: String, require: true },
    images: [{ type: String, require: true }],
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    idsku: {
      type: String,
      required: true,
    },
    skus: [skuSchema],
    vendorProductID: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model("Product", productSchema)

export default Product
