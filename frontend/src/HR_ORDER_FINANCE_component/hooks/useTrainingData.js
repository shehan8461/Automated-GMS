import { useQuery } from "@tanstack/react-query";
import TrainingAPI from "../api/TrainingAPI";

export const useTrainingData = () => {
  return useQuery(["trainings"], () => TrainingAPI.getTrainings());
};

export const useTraining = (id) => {
  return useQuery(["training", id], () => TrainingAPI.getTrainingById(id));
};

export const useTrainingCount = () => {
  return useQuery(["trainingCount"], () => TrainingAPI.getTrainingsCount());
};
