import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

//@description Create Product
//@route post /api/products/:id
//@access public

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    category,
    price,
    image,
    description,
    rating,
    numReviews,
  } = req.body

  const product = new Product({
    user: req.user._id,
    name,
    brand,
    category,
    price,
    image,
    description,
    rating,
    numReviews,
    skus: [],
  })
  const createdProduct = await product.save()
  if (createdProduct) {
    res.status(201).json(createdProduct)
  }
})

//@description Update Product
//@route put /api/products
//@access private admin

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  const { name, price, description, image, brand, category, numSkus } = req.body
  console.log(name)
  if (product) {
    product.name = name
    product.brand = brand
    product.category = category
    product.price = price
    product.image = image
    product.description = description
    product.numSkus = numSkus

    const updatedProduct = await product.save() // after we save user in database it will return the updateduser so we will save it to a variable.
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not Found")
  }
})

//@description Fetch all products
//@route GET /api/products when you put question mark in the url it can be accessed with query
//@access public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 4
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword, // we are using regex becuase when some one type ip we need iphone to come up
          $options: "i",
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .populate("category", "name")
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

//@description Fetch a single product
//@route GET /api/products:id
//@access public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "category",
    "name"
  )
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

//@description Delete product by ID
//@route GET /api/products/:id/delete
//@access private/ admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: "Product Removed" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

//@description Create Product Review
//@route POST /api/products/:id/reviews
//@access private/ admin

const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    //We will check if the user has already given review.
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(404)
      throw new Error("Product Already Reviewed")
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    //Now we will push the object we created in the reviews array of the product that we crated
    product.reviews.push(review) //

    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.numReviews

    await product.save()
    res.status(201).json({ message: "Review Added" })
  } else {
    res.status(404)
    throw new Error("Cannot Create Review")
  }
})

//@description Get Top Rated Products
//@route GET /api/products/top
//@access public

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json(products)
})

//@description Create SKU
//@route POST /api/products/:id/sku
//@access private/ admin

const createSku = asyncHandler(async (req, res) => {
  const { name, skuId, price, countInStock, color, size, image } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    //We will check if the user has already given review.
    const alreadyExisitSku = product.skus.find(
      (r) => r.skuId.toString() === skuId.toString()
    )
    if (alreadyExisitSku) {
      res.status(404)
      throw new Error("SKU already Added")
    }

    const sku = {
      skuId,
      name,
      price,
      countInStock,
      color,
      size,
      image,
    }
    //Now we will push the object we created in the reviews array of the product that we crated
    product.skus.push(sku) //

    product.numSkus = product.skus.length

    await product.save()
    res.status(201).json({ message: "SKU Added" })
  } else {
    res.status(404)
    throw new Error("Cannot Create SKU")
  }
})

//@description Delete SKU
//@route POST /api/products/:id/sku
//@access private/ admin

const deleteSku = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  const skuId = req.query.sku
  if (product) {
    const updatedSkus = product.skus.filter((sku) => sku._id === skuId)
    product.skus = updatedSkus
    await product.save()
    res.json({ message: "SKU Removed" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

//@description Update Product
//@route put /api/products
//@access private admin

const updateSku = asyncHandler(async (req, res) => {
  const productId = req.params.id
  const skuId = req.body.skuEditId
  const name = req.body.name
  const color = req.body.color
  const size = req.body.size
  const countInStock = req.body.countInStock
  const image = req.body.image
  const price = req.body.price

  await Product.updateOne(
    { _id: productId },
    {
      $set: {
        "skus.$[s].name": name,
        "skus.$[s].color": color,
        "skus.$[s].size": size,
        "skus.$[s].countInStock": countInStock,
        "skus.$[s].image": image,
        "skus.$[s].price": price,
      },
    },
    { arrayFilters: [{ "s._id": skuId }] }
  )

  const product = await Product.findById(productId)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("Product not Found")
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopProducts,
  createSku,
  deleteSku,
  updateSku,
}
