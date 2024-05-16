import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useFundStore } from "../../store/useFundStore";
import { useFundData } from "../../hooks/useFundData";
import { BootstrapModal } from "../../components";
import FundAPI from "../../api/FundAPI";
import Toast from "../../utils/toast";

const AddFundModal = () => {
  // Get the state and actions from the store
  const { isAddFundModalOpen, closeAddFundModal } = useFundStore((state) => ({
    isAddFundModalOpen: state.isAddFundModalOpen,
    closeAddFundModal: state.closeAddFundModal,
  }));

  // Get refetch function from react-query hook
  const { refetch } = useFundData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(FundAPI.create, {
    onSuccess: () => {
      // close the modal and refetch the data
      closeAddFundModal();
      refetch();
      Toast({ type: "success", message: "Fund created successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error.message });
    },
  });

  // Submit function
  const onSubmit = (values) => {
    // covert the allocatedAmount and spentAmount to number
    values.allocatedAmount = Number(values.allocatedAmount);
    values.spentAmount = Number(values.spentAmount);
    //
    mutate(values);
    reset();
  };

  return (
    <BootstrapModal
      show={isAddFundModalOpen}
      handleClose={closeAddFundModal}
      title="Add Fund"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddFundModal;
