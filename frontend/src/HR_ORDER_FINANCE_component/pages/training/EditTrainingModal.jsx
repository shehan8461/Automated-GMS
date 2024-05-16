import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useTrainingStore } from "../../store/useTrainingStore";
import { useTrainingData } from "../../hooks/useTrainingData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import TrainingAPI from "../../api/TrainingAPI";

const EditTrainingModal = () => {
  // Get the state and actions from the store
  const { isEditTrainingModalOpen, closeEditTrainingModal, selectedTraining } =
    useTrainingStore((state) => ({
      isEditTrainingModalOpen: state.isEditTrainingModalOpen,
      closeEditTrainingModal: state.closeEditTrainingModal,
      selectedTraining: state.selectedTraining,
    }));

  // Get refetch function from react-query hook
  const { refetch } = useTrainingData();

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Update mutation
  const { mutate } = useMutation(TrainingAPI.updateTraining, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditTrainingModal();
      Toast({ type: "success", message: "Training updated successfully" });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({ id: selectedTraining._id, data });
    reset();
  };

  useEffect(() => {
    // Set the form values when the selectedTraining changes
    if (selectedTraining) {
      setValue("name", selectedTraining.name);
      setValue("description", selectedTraining.description);
      setValue("date", selectedTraining.date);
      setValue("time", selectedTraining.time);
      setValue("departments", selectedTraining.departments);
    }
  }, [selectedTraining, setValue]);

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
      show={isEditTrainingModalOpen}
      handleClose={closeEditTrainingModal}
      title={`Edit: ${selectedTraining?.name}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label htmlFor="name" className="form-label">
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

        <div className="mb-2">
          <label htmlFor="description" className="form-label">
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

        <div className="mb-2">
          <label htmlFor="date" className="form-label">
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

        <div className="mb-2">
          <label htmlFor="time" className="form-label">
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

        <div className="mb-2">
          <label htmlFor="departments" className="form-label">
            Department
          </label>
          <select
            className="form-select"
            id="departments"
            name="departments"
            {...register("departments", { required: true })}
          >
            {departmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.departments && (
            <small className="form-text text-danger">
              Department is required
            </small>
          )}
        </div>

        <button type="submit" className="btn btn-primary  mt-3">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditTrainingModal;
