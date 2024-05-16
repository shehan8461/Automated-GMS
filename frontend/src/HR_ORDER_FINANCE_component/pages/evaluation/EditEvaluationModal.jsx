import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useEvaluationStore } from "../../store/useEvaluationStore";
import { useEvaluationData } from "../../hooks/useEvaluationData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import EvaluationAPI from "../../api/EvaluationAPI";
import { useUserData } from "../../hooks/useUserData";

const EditEvaluationModal = () => {
  // Get the state and actions from the store
  const {
    isEditEvaluationModalOpen,
    closeEditEvaluationModal,
    selectedEvaluation,
  } = useEvaluationStore((state) => ({
    isEditEvaluationModalOpen: state.isEditEvaluationModalOpen,
    closeEditEvaluationModal: state.closeEditEvaluationModal,
    selectedEvaluation: state.selectedEvaluation,
  }));

  // Get refetch function from react-query hook
  const { refetch } = useEvaluationData();

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Update mutation
  const { mutate } = useMutation(EvaluationAPI.updateEvaluation, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditEvaluationModal();
      Toast({ type: "success", message: "Evaluation updated successfully" });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({ id: selectedEvaluation._id, data });
    reset();
  };

  useEffect(() => {
    // Set the form values when the selectedEvaluation changes
    if (selectedEvaluation) {
      setValue("date", selectedEvaluation.date);
      setValue("marks", selectedEvaluation.marks);
    }
  }, [selectedEvaluation, setValue]);

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Colombo",
  });

  return (
    <BootstrapModal
      show={isEditEvaluationModalOpen}
      handleClose={closeEditEvaluationModal}
      title={`Edit: ${selectedEvaluation?.employee?.name}'s Evaluation`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            max={today}
            {...register("date", { required: true })}
          />
          {errors.date && (
            <small className="form-text text-danger">Date is required</small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="marks" className="form-label">
            Marks (in %)
          </label>
          <input
            type="text"
            className="form-control"
            id="marks"
            name="marks"
            {...register("marks", { required: true })}
          />
          {errors.marks && (
            <small className="form-text text-danger">Marks is required</small>
          )}
        </div>

        <button type="submit" className="btn btn-primary  mt-3">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditEvaluationModal;
