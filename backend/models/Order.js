const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
        material: { type: String, required: true },
      },
    ],
    shippingAddress: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "delivered"],
      default: "pending",
    },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
