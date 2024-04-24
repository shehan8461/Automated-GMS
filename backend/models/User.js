const mongoose = require("mongoose");
const USER_ROLES = require("../constants/roles_OM");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.CUSTOMER,
    },
    stripeCustomerId: { type: String },
    status: {
      type: String,
      enum: ["pending", "verified", "suspended"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
