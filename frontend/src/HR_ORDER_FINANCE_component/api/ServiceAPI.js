import api from "./api";

class ServiceAPI {
  // Create Service
  static create(values) {
    return api.post("/api/services", values);
  }

  // Get all Services
  static getAll() {
    return api.get("/api/services");
  }

  // Get Service by id
  static getById(id) {
    return api.get(`/api/services/${id}`);
  }

  // Update Service
  static update(values) {
    const { id, data } = values;
    return api.patch(`/api/services/${id}`, data);
  }

  // Delete Service
  static delete(id) {
    return api.delete(`/api/services/${id}`);
  }
}

export default ServiceAPI;
