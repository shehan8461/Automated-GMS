import api from "./api";

class BankCommunicationAPI {
  // Create BankCommunication
  static create(values) {
    return api.post("/api/bank-communications", values);
  }

  // Get all BankCommunications
  static getAll() {
    return api.get("/api/bank-communications");
  }

  // Get BankCommunication by id
  static getById(id) {
    return api.get(`/api/bank-communications/${id}`);
  }

  // Update BankCommunication
  static update(values) {
    const { id, data } = values;
    return api.patch(`/api/bank-communications/${id}`, data);
  }

  // Delete BankCommunication
  static delete(id) {
    return api.delete(`/api/bank-communications/${id}`);
  }

  // Get BankCommunications Count
  static getCount() {
    return api.get("/api/bank-communications/count");
  }
}

export default BankCommunicationAPI;
