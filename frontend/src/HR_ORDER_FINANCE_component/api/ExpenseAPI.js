import api from "./api";

class ExpenseAPI {
  // Create Expense
  static create(values) {
    return api.post("/api/expenses", values);
  }

  // Get all Expenses
  static getAll() {
    return api.get("/api/expenses");
  }

  // Get Expense by id
  static getById(id) {
    return api.get(`/api/expenses/${id}`);
  }

  // Update Expense
  static update(values) {
    const { id, data } = values;
    return api.patch(`/api/expenses/${id}`, data);
  }

  // Delete Expense
  static delete(id) {
    return api.delete(`/api/expenses/${id}`);
  }

  // Get Expenses Count
  static getCount() {
    return api.get("/api/expenses/count");
  }

  // Get Total Expenses Amount This Month
  static getTotalAmountThisMonth() {
    return api.get("/api/expenses/total-amount");
  }
}

export default ExpenseAPI;
