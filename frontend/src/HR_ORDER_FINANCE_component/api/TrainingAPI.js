import api from "./api";

class TrainingAPI {
  // Create training
  static createTraining(data) {
    return api.post("/api_HR/trainings", data);
  }

  // Get all trainings
  static getTrainings() {
    return api.get("/api_HR/trainings");
  }

  // Get training by id
  static getTrainingById(id) {
    return api.get(`/api_HR/trainings/${id}`);
  }

  // Update training
  static updateTraining(values) {
    const { id, data } = values;
    return api.patch(`/api_HR/trainings/${id}`, data);
  }

  // Delete training
  static deleteTraining(id) {
    return api.delete(`/api_HR/trainings/${id}`);
  }

  // Get trainings count
  static getTrainingsCount() {
    return api.get("/api_HR/trainings/count");
  }
}

export default TrainingAPI;
