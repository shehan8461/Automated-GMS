import api from "./api";

class FundAPI {
  // Create Fund
  static create(values) {
    return api.post("/api/funds", values);
  }

  // Get all Funds
  static getAll() {
    return api.get("/api/funds");
  }

  // Get Fund by id
  static getById(id) {
    return api.get(`/api/funds/${id}`);
  }

  // Update Fund
  static update(values) {
    const { id, data } = values;
    return api.patch(`/api/funds/${id}`, data);
  }

  // Delete Fund
  static delete(id) {
    return api.delete(`/api/funds/${id}`);
  }

  // Get Funds Count
  static getCount() {
    return api.get("/api/funds/count");
  }
}

export default FundAPI;
