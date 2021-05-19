import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"

//@description Create Order
//@route POST /api/orders
//@access private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body // extracting the values from req.body and saving to variables

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error("No order items")
    return
  } else {
    const order = new Order({
      //arranging the data in variables in the Order Schema
      orderItems,
      shippingAddress,
      user: req.user._id,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save() //saved the order in database

    res.status(201).json(createdOrder)
  }
})

//@description Get Order by ID
//@route put /api/orders/:id
//@access private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ) //We used populate to get the data of the user in the object from the DB. we only need name and email so we mentioned it as second input.

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

//@description Change Order to Paid
//@route get /api/orders/:id/pay
//@access private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  // Here we will send the request to paypal and the response we get back we will update the status to paid.
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

//@description Change Order to Paid
//@route get /api/orders/:id/pay
//@access private

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  // Here we will send the request to paypal and the response we get back we will update the status to paid.
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

//@description Get logged in user orders
//@route get /api/orders/myorders
//@access private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }) // we will pass the user id so it will search for the orders with the specific id.
  res.json(orders)
})

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "id name") // We will search for all orders.
  res.json(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered,
}
