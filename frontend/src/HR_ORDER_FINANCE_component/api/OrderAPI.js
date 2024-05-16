import api from "./api";

class OrderAPI {
  // Create Order
  static create(values) {
    return api.post("/api/orders", values);
  }

  // Get all Orders
  static getAll() {
    return api.get("/api/orders");
  }

  // Get Order by id
  static getById(id) {
    return api.get(`/api/orders/${id}`);
  }

  // Update Order
  static update(values) {
    const { id, data } = values;
    return api.patch(`/api/orders/${id}`, data);
  }

  // Delete Order
  static delete(id) {
    return api.delete(`/api/orders/${id}`);
  }

  // Get Orders by Customer
  static getByCustomer() {
    return api.get("/api/orders/my-orders");
  }

  // Get Orders Count
  static getCount() {
    return api.get("/api/orders/count");
  }

  // Get Total Sales
  static getTotalSales() {
    return api.get("/api/orders/total-sales");
  }
}

export default OrderAPI;
