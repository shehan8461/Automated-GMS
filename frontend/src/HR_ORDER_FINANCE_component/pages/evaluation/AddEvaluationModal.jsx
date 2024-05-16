import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEvaluationStore } from "../../store/useEvaluationStore";
import { useEvaluationData } from "../../hooks/useEvaluationData";
import { BootstrapModal } from "../../components";
import EvaluationAPI from "../../api/EvaluationAPI";
import Toast from "../../utils/toast";
import { useUserData } from "../../hooks/useUserData";

const AddEvaluationModal = () => {
  const { data: employees } = useUserData();
  // Get the state and actions from the store
  const { isAddEvaluationModalOpen, closeAddEvaluationModal } =
    useEvaluationStore((state) => ({
      isAddEvaluationModalOpen: state.isAddEvaluationModalOpen,
      closeAddEvaluationModal: state.closeAddEvaluationModal,
    }));

  // Get refetch function from react-query hook
  const { refetch } = useEvaluationData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(EvaluationAPI.createEvaluation, {
    onSuccess: () => {
      // close the modal and refetch the data
      closeAddEvaluationModal();
      refetch();
      Toast({ type: "success", message: "Evaluation created successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error.message });
    },
  });

  // Submit function
  const onSubmit = (values) => {
    // conver t marks to number
    values.marks = Number(values.marks);
    mutate(values);
    reset();
  };

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Colombo",
  });

  return (
    <BootstrapModal
      show={isAddEvaluationModalOpen}
      handleClose={closeAddEvaluationModal}
      title="Add Evaluation"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* Employee */}
        <div className="form-group">
          <label className="my-2" htmlFor="employee">
            Employee
          </label>
          <select
            className="form-control"
            id="employee"
            name="employee"
            {...register("employee", { required: true })}
          >
            <option value="">Select Employee</option>
            {employees?.data?.employees?.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>
          {errors.employee && (
            <small className="form-text text-danger">
              Employee is required
            </small>
          )}
        </div>

        <div className="form-group">
          <label className="my-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            className={`form-control ${errors.date ? "is-invalid" : ""}`}
            id="date"
            name="date"
            max={today}
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && (
            <small className="form-text text-danger">
              {errors.date.message}
            </small>
          )}
        </div>

        <div className="form-group">
          <label className="my-2" htmlFor="marks">
            Marks (out of 100)
          </label>
          <input
            type="number"
            className="form-control"
            id="marks"
            name="marks"
            {...register("marks", { required: true })}
            min="0"
            max="100"
          />
          {errors.marks && (
            <small className="form-text text-danger">Marks is required</small>
          )}
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddEvaluationModal;
