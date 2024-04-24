const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    // optional fields
    attendance: { type: Number },
    noPay: { type: Number },
    otHours: { type: Number },
    otPayment: { type: Number },
    epf_fromEmployee: { type: Number },
    epf_fromEmployer: { type: Number },
    etf: { type: Number },
    adjustment: { type: Number },
    specialPayment: { type: Number },
    grossEarning: { type: Number },
    totalDeduction: { type: Number },
    totalPayableSalary: { type: Number },
  },
  {
    timestamps: true,
  }
);

// Adding a compound unique index on month, year and employee
payrollSchema.index({ month: 1, year: 1, employee: 1 }, { unique: true });

module.exports = mongoose.model("Payroll", payrollSchema);
