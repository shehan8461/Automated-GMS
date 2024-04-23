const cron = require("node-cron");
const Payroll = require("../../models/Payroll_HR");
const User = require("../../models/User_HR");

const generatePayroll = () => {
  // Schedule the task to run on the 20th day of every month at 00:00
  cron.schedule(
    "0 0 20 * *",
    // "* * * * *", // For testing purposes, run every minute
    () => {
      console.log("Running a task");
      // Get all employees
      User.find()
        .then((employees) => {
          // Loop through all employees
          employees.forEach(async (employee) => {
            //  if payroll for this month already exists ????
            const existingPayroll = await Payroll.findOne({
              employee: employee._id,
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
            });

            if (existingPayroll) {//if yes
              console.log(
                `Payroll for ${employee.name} already exists for this month`
              );
              return;
            }

            // gross earning = base salary - no pay + ot payment + employee.allowance + special payment
            const grossEarning = employee.baseSalary + employee.allowance;
            const totalPayableSalary = grossEarning;

            // Create payroll
            const newPayroll = new Payroll({
              employee: employee._id,
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
              attendance: 0, //? Manual input
              noPay: 0, //? Manual input
              otHours: 0, //? Manual input
              otPayment: 0, //! Need otHours to calculate
              epf_fromEmployee: 0, //! Need NoPay to calculate
              epf_fromEmployer: 0, //! Need NoPay to calculate
              etf: 0, //! Need NoPay to calculate
              adjustment: 0, //? Manual input
              specialPayment: 0, //? Manual input
              grossEarning: grossEarning, //! Calculated
              totalDeduction: 0, //! Calculated
              totalPayableSalary: totalPayableSalary, //! Calculated
            });

            await newPayroll.save();

            console.log(`Payroll for ${employee.name} created successfully`);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    {
      scheduled: true,
      timezone: "Asia/Colombo",
    }
  );
  console.log("--------Cron job scheduled----------");
  console.log(
    "-------- Paysheets will be created automatically on the 20th of every month at midnight.-------"
  );
};

module.exports = generatePayroll;
