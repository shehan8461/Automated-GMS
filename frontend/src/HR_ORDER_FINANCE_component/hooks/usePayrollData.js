import { useQuery } from "@tanstack/react-query";
import PayrollAPI from "../api/PayrollAPI";

export const usePayrollData = () => {
  return useQuery(["payrolls"], () => PayrollAPI.getPayrolls());
};

export const usePayroll = (id) => {
  return useQuery(["payroll", id], () => PayrollAPI.getPayrollById(id));
};

export const useEmployeePayrolls = () => {
  return useQuery(["employeePayrolls"], () => PayrollAPI.getEmployeePayrolls());
};
