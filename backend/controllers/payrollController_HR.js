const USER_ROLES = require("../constants_HR/roles_HR");
const Payroll = require("../models/Payroll_HR");
const { z } = require("zod");

const updatePayrollSchema = z.object({
  attendance: z.number(),
  noPay: z.number(),
  otHours: z.number(),
  adjustment: z.number(),
  specialPayment: z.number(),
});

const payrollController = {
  // get all payrolls
  getPayrolls: async (req, res) => {
    try {
      // populate employee details without password
      const payrolls = await Payroll.find().populate("employee", {
        password: 0,
      });

      res.status(200).json({ success: true, payrolls });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get payroll by id
  getPayrollById: async (req, res) => {
    try {
      const payrollId = req.params.id;
      // populate employee details without password
      const payroll = await Payroll.findById(payrollId).populate("employee", {
        password: 0,
      });

      if (!payroll) {
        return res.status(404).json({
          success: false,
          message: "Payroll not found",
        });
      }

      res.status(200).json({ success: true, payroll });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // update payroll
  updatePayroll: async (req, res) => {
    try {
      const payrollId = req.params.id;

      // validation
      updatePayrollSchema.parse(req.body);

      // populate employee details
      const payroll = await Payroll.findById(payrollId).populate("employee", {
        password: 0,
      });

      if (!payroll) {
        return res.status(404).json({
          success: false,
          message: "Payroll not found",
        });
      }

      // should be updatable only during 20th to 23rd of every month
      // ! Temporarily disabled for testing
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      if (currentDay < 20 || currentDay > 23) {
        return res.status(400).json({
          success: false,
          message:
            "Payroll can be updated only between 20th to 23rd of every month",
        });
      }

      // calculate otPayment - (Basic/208) OT_Hours *1.5  - for role = GENERAL | (Basic/240) OT_Hours *1.5  - for role = MANAGER and EXECUTIVE
      let otPayment = 0;
      if (payroll.employee.role === USER_ROLES.GENERAL) {
        otPayment =
          (payroll.employee.baseSalary / 208) * req.body.otHours * 1.5;
      } else if (
        payroll.employee.role === USER_ROLES.MANAGER ||
        payroll.employee.role === USER_ROLES.EXECUTIVE
      ) {
        otPayment =
          (payroll.employee.baseSalary / 240) * req.body.otHours * 1.5;
      }

      // calculate epf_fromEmployee - (Basic - NoPay) * 0.08
      const epf_fromEmployee =
        (payroll.employee.baseSalary - req.body.noPay) * 0.08;

      // calculate epf_fromEmployer - (Basic - NoPay) * 0.12
      const epf_fromEmployer =
        (payroll.employee.baseSalary - req.body.noPay) * 0.12;

      // calculate etf - (Basic - NoPay) * 0.03
      const etf = (payroll.employee.baseSalary - req.body.noPay) * 0.03;

      // calculate grossEarning - base salary - no pay + ot payment + employee.allowance + special payment
      const grossEarning =
        payroll.employee.baseSalary -
        req.body.noPay +
        otPayment +
        payroll.employee.allowance +
        req.body.specialPayment;

      // calculate totalDeduction - epf_fromEmployee + adjustment
      const totalDeduction = epf_fromEmployee + req.body.adjustment;

      // calculate totalPayableSalary - gross earning - total deduction
      const totalPayableSalary = grossEarning - totalDeduction;

      const updatedPayroll = await Payroll.findByIdAndUpdate(
        payrollId,
        {
          ...req.body,
          otPayment,
          epf_fromEmployee,
          epf_fromEmployer,
          etf,
          grossEarning,
          totalDeduction,
          totalPayableSalary,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        payroll: updatedPayroll,
        message: "Payroll updated successfully",
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

  // delete payroll
  deletePayroll: async (req, res) => {
    try {
      const payrollId = req.params.id;

      const payroll = await Payroll.findById(payrollId);

      if (!payroll) {
        return res.status(404).json({
          success: false,
          message: "Payroll not found",
        });
      }

      const deletedPayroll = await Payroll.findByIdAndDelete(payrollId);

      res.status(200).json({
        success: true,
        payroll: deletedPayroll,
        message: "Payroll deleted successfully",
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

  // getEmployeePayrolls
  getEmployeePayrolls: async (req, res) => {
    try {
      const employeeId = req.userId;

      const payrolls = await Payroll.find({ employee: employeeId });

      res.status(200).json({ success: true, payrolls });
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

module.exports = payrollController;
