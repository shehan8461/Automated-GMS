import api from "./api";

class PayrollAPI {
  // Get all payrolls
  static getPayrolls() {
    return api.get("/api_HR/payrolls");
  }

  // Get payroll by id
  static getPayrollById(id) {
    return api.get(`/api_HR/payrolls/${id}`);
  }

  // Update payroll
  static updatePayroll(values) {
    const { id, data } = values;
    return api.patch(`/api_HR/payrolls/${id}`, data);
  }

  // Delete payroll
  static deletePayroll(id) {
    return api.delete(`/api_HR/payrolls/${id}`);
  }

  // Get employee payrolls
  static getEmployeePayrolls() {
    return api.get("/api_HR/payrolls/employee");
  }
}

export default PayrollAPI;
