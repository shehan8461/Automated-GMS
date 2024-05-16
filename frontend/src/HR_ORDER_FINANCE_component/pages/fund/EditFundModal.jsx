import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useFundStore } from "../../store/useFundStore";
import { useFundData } from "../../hooks/useFundData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import FundAPI from "../../api/FundAPI";

const EditFundModal = () => {
  // Get the state and actions from the store
  const { isEditFundModalOpen, closeEditFundModal, selectedFund } =
    useFundStore((state) => ({
      isEditFundModalOpen: state.isEditFundModalOpen,
      closeEditFundModal: state.closeEditFundModal,
      selectedFund: state.selectedFund,
    }));

  // Get refetch function from react-query hook
  const { refetch } = useFundData();

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Update mutation
  const { mutate } = useMutation(FundAPI.update, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditFundModal();
      Toast({ type: "success", message: "Fund updated successfully" });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({ id: selectedFund._id, data });
  };

  useEffect(() => {
    // Set the form values when the selectedFund changes
    if (selectedFund) {
      setValue("department", selectedFund.department);
      setValue("project", selectedFund.project);
      setValue("allocatedAmount", selectedFund.allocatedAmount);
      setValue("spentAmount", selectedFund.spentAmount);
    }
  }, [selectedFund, setValue]);

  return (
    <BootstrapModal
      show={isEditFundModalOpen}
      handleClose={closeEditFundModal}
      title={`Edit: ${selectedFund?.project} Fund`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Department */}
        <div className="form-group">
          <label className="my-2" htmlFor="department">
            Department
          </label>
          <input
            type="text"
            className="form-control"
            id="department"
            name="department"
            {...register("department", { required: true })}
          />
          {errors.department && (
            <small className="form-text text-danger">
              Department is required
            </small>
          )}
        </div>

        {/* Project */}
        <div className="form-group">
          <label className="my-2" htmlFor="project">
            Project
          </label>
          <input
            type="text"
            className="form-control"
            id="project"
            name="project"
            {...register("project", { required: true })}
          />
          {errors.project && (
            <small className="form-text text-danger">Project is required</small>
          )}
        </div>

        {/* Allocated Amount */}
        <div className="form-group">
          <label className="my-2" htmlFor="allocatedAmount">
            Allocated Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="allocatedAmount"
            name="allocatedAmount"
            {...register("allocatedAmount", { required: true })}
          />
          {errors.allocatedAmount && (
            <small className="form-text text-danger">
              Allocated Amount is required
            </small>
          )}
        </div>

        {/* Spent Amount */}
        <div className="form-group">
          <label className="my-2" htmlFor="spentAmount">
            Spent Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="spentAmount"
            name="spentAmount"
            {...register("spentAmount", { required: false })}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditFundModal;
