import api from "./api";

class EvaluationAPI {
  // Create evaluation
  static createEvaluation(data) {
    return api.post("/api_HR/evaluations", data);
  }

  // Get all evaluations
  static getEvaluations() {
    return api.get("/api_HR/evaluations");
  }

  // Get evaluation by id
  static getEvaluationById(id) {
    return api.get(`/api_HR/evaluations/${id}`);
  }

  // Update evaluation
  static updateEvaluation(values) {
    const { id, data } = values;
    return api.patch(`/api_HR/evaluations/${id}`, data);
  }

  // Delete evaluation
  static deleteEvaluation(id) {
    return api.delete(`/api_HR/evaluations/${id}`);
  }

  // Get evaluations count
  static getEvaluationsCount() {
    return api.get("/api_HR/evaluations/count");
  }

  // Get employee evaluations
  static getEmployeeEvaluations() {
    return api.get("/api_HR/evaluations/employee");
  }
}

export default EvaluationAPI;
