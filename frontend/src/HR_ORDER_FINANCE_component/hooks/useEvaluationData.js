import { useQuery } from "@tanstack/react-query";
import EvaluationAPI from "../api/EvaluationAPI";

export const useEvaluationData = () => {
  return useQuery(["evaluations"], () => EvaluationAPI.getEvaluations());
};

export const useEvaluationCount = () => {
  return useQuery(["evaluationCount"], () =>
    EvaluationAPI.getEvaluationsCount()
  );
};

export const useEvaluation = (id) => {
  return useQuery(["evaluation", id], () =>
    EvaluationAPI.getEvaluationById(id)
  );
};

export const useEmployeeEvaluations = () => {
  return useQuery(["employeeEvaluations"], () =>
    EvaluationAPI.getEmployeeEvaluations()
  );
};
