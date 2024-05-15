const mongoose = require("mongoose");
const USER_ROLES = require("../constants_HR/roles_HR");

const resignedEmployeesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.GENERAL,
    },
    baseSalary: { type: Number },
    allowance: { type: Number },
    designation: { type: String },
    department: { type: String },
    skillLevel: { type: String },
    document: { type: String },
    photo: { type: String },
    resignedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ResignedEmployees", resignedEmployeesSchema);
