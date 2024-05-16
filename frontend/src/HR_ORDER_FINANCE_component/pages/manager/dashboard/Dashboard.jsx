import React from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import {
  useResignedEmployeesCount,
  useUserCount,
} from "../../../hooks/useUserData";
import { useTrainingCount } from "../../../hooks/useTrainingData";
import { useEvaluationCount } from "../../../hooks/useEvaluationData";

const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the data from the react-query hook
  const { data: userCount } = useUserCount();
  const { data: resignedEmployeesCount } = useResignedEmployeesCount();
  const { data: trainingCount } = useTrainingCount();
  const { data: evaluationCount } = useEvaluationCount();
  //
  return (
    <div className="container mt-4">
      {user && (
        <div className="alert alert-primary" role="alert">
          You are logged in as <strong>{user.role}</strong>
        </div>
      )}

      <div className="row">
        <h2 className="mb-3">
          {/* greeting message based on the time of the day */}
          {new Date().getHours() < 12
            ? "Good Morning"
            : new Date().getHours() < 18
            ? "Good Afternoon"
            : "Good Evening"}
          , {user && user.name}
        </h2>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">Employees</h5>
              <p className="card-text fs-4 fw-bold">
                {userCount?.data?.count || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">Resigned Employees</h5>
              <p className="card-text fs-4 fw-bold">
                {resignedEmployeesCount?.data?.count || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">Trainings</h5>
              <p className="card-text fs-4 fw-bold">
                {trainingCount?.data?.count || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">Evaluations</h5>
              <p className="card-text fs-4 fw-bold">
                {evaluationCount?.data?.count || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
