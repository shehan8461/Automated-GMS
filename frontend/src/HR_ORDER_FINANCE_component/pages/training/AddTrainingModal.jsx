import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTrainingStore } from "../../store/useTrainingStore";
import { useTrainingData } from "../../hooks/useTrainingData";
import { BootstrapModal } from "../../components";
import TrainingAPI from "../../api/TrainingAPI";
import Toast from "../../utils/toast";

const AddTrainingModal = () => {
  // Get the state and actions from the store
  const { isAddTrainingModalOpen, closeAddTrainingModal } = useTrainingStore(
    (state) => ({
      isAddTrainingModalOpen: state.isAddTrainingModalOpen,
      closeAddTrainingModal: state.closeAddTrainingModal,
    })
  );

  // Get refetch function from react-query hook
  const { refetch } = useTrainingData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(TrainingAPI.createTraining, {
    onSuccess: () => {
      // close the modal and refetch the data
      closeAddTrainingModal();
      refetch();
      Toast({ type: "success", message: "Training created successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error.message });
    },
  });

  // Submit function
  const onSubmit = (values) => {
    mutate(values);
    reset();
  };

  const departmentOptions = [
    { value: "HR Department", label: "HR Department" },
    { value: "Order Department", label: "Order Department" },
    { value: "Finance Department", label: "Finance Department" },
    { value: "Marketing Department", label: "Marketing Department" },
    {
      value: "Inventory and Stocks Department",
      label: "Inventory and Stocks Department",
    },
    { value: "Supplier Department", label: "Supplier Department" },
    { value: "Transport Department", label: "Transport Department" },
    { value: "Sales Department", label: "Sales Department" },
  ];

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Colombo",
  });

  return (
    <BootstrapModal
      show={isAddTrainingModalOpen}
      handleClose={closeAddTrainingModal}
      title="Add Training"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="form-group">
          <label className="my-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <small className="form-text text-danger">Name is required</small>
          )}
        </div>

        <div className="form-group">
          <label className="my-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <small className="form-text text-danger">
              Description is required
            </small>
          )}
        </div>

        <div className="form-group">
          <label className="my-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            min={today}
            {...register("date", { required: true })}
          />
          {errors.date && (
            <small className="form-text text-danger">Date is required</small>
          )}
        </div>

        <div className="form-group">
          <label className="my-2" htmlFor="time">
            Time
          </label>
          <input
            type="time"
            className="form-control"
            id="time"
            name="time"
            {...register("time", { required: true })}
          />
          {errors.time && (
            <small className="form-text text-danger">Time is required</small>
          )}
        </div>

        <div className="form-group">
          <label className="my-2" htmlFor="departments">
            Departments
          </label>
          <select
            className="form-control"
            id="departments"
            name="departments"
            {...register("departments", { required: true })}
          >
            <option value="">Select Department</option>
            {departmentOptions.map((department) => (
              <>
                <option key={department.value} value={department.value}>
                  {department.label}
                </option>
              </>
            ))}
          </select>
          {errors.departments && (
            <small className="form-text text-danger">
              Departments is required
            </small>
          )}
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddTrainingModal;
