const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const sendEmail = require("../util/email_templates/sendEmail");
const orderPlacedEmailTemplate = require("../util/email_templates/orderPlacedEmailTemplate");
const { z } = require("zod");

const createOrderSchema = z.object({
  customer: z.string(),
  orderItems: z.array(
    z.object({
      product: z.string(),
      quantity: z.number(),
      size: z.string(),
      color: z.string(),
      material: z.string(),
    })
  ),
  shippingAddress: z.string(),
  status: z.string(),
  totalPrice: z.number(),
});

const orderController = {
  // create order
  createOrder: async (req, res) => {
    try {
      const {
        customer,
        orderItems,
        shippingAddress,
        status,
        totalPrice,
        size,
        color,
        material,
      } = req.body;

      // validation
      createOrderSchema.parse(req.body);

      const newOrder = new Order({
        customer,
        orderItems,
        shippingAddress,
        status,
        totalPrice,
        size,
        color,
        material,
      });

      const savedOrder = await newOrder.save();

      // get customer details
      const customerDetails = await User.findById(customer);

      // send email to customer
      const emailTemplate = orderPlacedEmailTemplate(
        customerDetails.name,
        savedOrder._id,
        savedOrder.createdAt
      );
      sendEmail(customerDetails.email, "Order Confirmation", emailTemplate);

      // update product stock
      for (let i = 0; i < orderItems.length; i++) {
        const { product, quantity } = orderItems[i];

        const productDetails = await Product.findById(product);

        productDetails.countInStock = productDetails.countInStock - quantity;

        await productDetails.save();
      }

      res.status(201).json({
        success: true,
        order: savedOrder,
        message: "Order created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get all orders
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("customer", "name email")
        .populate("orderItems.product", "name price");

      res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get order by id
  getOrderById: async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId)
        .populate("customer", "name email")
        .populate("orderItems.product", "name price");

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // update order
  updateOrder: async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
        new: true,
      });

      res.status(200).json({
        success: true,
        order: updatedOrder,
        message: "Order updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // delete order
  deleteOrder: async (req, res) => {
    try {
      const orderId = req.params.id;

      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      const deletedOrder = await Order.findByIdAndDelete(orderId);

      res.status(200).json({
        success: true,
        order: deletedOrder,
        message: "Order deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get orders by customer id
  getOrdersByCustomer: async (req, res) => {
    try {
      const customerId = req.userId;
      const orders = await Order.find({ customer: customerId })
        .populate("customer", "name email")
        .populate("orderItems.product", "name price");

      res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get orders count using aggregation
  getOrdersCount: async (req, res) => {
    try {
      const ordersCount = await Order.aggregate([
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

      res
        .status(200)
        .json({ success: true, count: ordersCount[0]?.count || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // Total sales using aggregation oder status except "pending"
  getTotalSales: async (req, res) => {
    try {
      const totalSales = await Order.aggregate([
        {
          $match: { status: { $ne: "pending" } },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$totalPrice" },
          },
        },
      ]);

      res
        .status(200)
        .json({ success: true, totalSales: totalSales[0]?.total || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
};

module.exports = orderController;
