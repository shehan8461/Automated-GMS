import api from "./api";

class UserAPI {
  // Get all users
  static getUsers() {
    return api.get("/api_HR/users");
  }

  // Get users count
  static getUsersCount() {
    return api.get("/api_HR/users/count");
  }

  // Get resigned employees
  static getResignedEmployees() {
    return api.get("/api_HR/users/resigned");
  }

  // Get resigned employees count
  static getResignedEmployeesCount() {
    return api.get("/api_HR/users/resigned/count");
  }

  // Get user by id
  static getUserById(id) {
    return api.get(`/api_HR/users/${id}`);
  }

  // Update user
  static updateUser(values) {
    const { id, data } = values;
    return api.patch(`/api_HR/users/${id}`, data);
  }

  // Delete user
  static deleteUser(id) {
    return api.delete(`/api_HR/users/${id}`);
  }

  // Add training to user
  static addTrainingToUser(values) {
    const { id, data } = values;
    return api.patch(`/api_HR/users/${id}/training`, data);
  }
}

export default UserAPI;
