import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../store/useUserStore";
import { useUserData } from "../../hooks/useUserData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import UserAPI from "../../api/UserAPI";
import { useTrainingData } from "../../hooks/useTrainingData";

const AddTrainingModal = () => {
  // Get the state and actions from the store
  const { isAddTrainingModalOpen, closeAddTrainingModal, selectedUser } =
    useUserStore((state) => ({
      isAddTrainingModalOpen: state.isAddTrainingModalOpen,
      closeAddTrainingModal: state.closeAddTrainingModal,
      selectedUser: state.selectedUser,
    }));

  // Get refetch function from react-query hook
  const { refetch } = useUserData();
  const { data: trainings } = useTrainingData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(UserAPI.addTrainingToUser, {
    onSuccess: () => {
      // close the modal and refetch the data
      closeAddTrainingModal();
      refetch();
      Toast({ type: "success", message: "Training added successfully" });
    },
    onError: (error) => {
      Toast({
        type: "error",
        message: error?.response?.data?.message || "Something went wrong",
      });
    },
  });

  // Submit function
  const onSubmit = (values) => {
    console.log(values);
    const dataToSend = {
      id: selectedUser._id,
      data: values,
    };
    mutate(dataToSend);
    reset();
  };

  return (
    <BootstrapModal
      show={isAddTrainingModalOpen}
      handleClose={closeAddTrainingModal}
      title={`Add Training to ${selectedUser?.name}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* trainings dropdown */}
        <div className="form-group">
          <label className="my-2" htmlFor="training">
            Training
          </label>
          <select
            className="form-control"
            id="training"
            name="training"
            {...register("training", { required: true })}
          >
            <option value="">Select Training</option>
            {trainings?.data?.trainings?.map((training) => (
              <option key={training._id} value={training._id}>
                {training.name}
              </option>
            ))}
          </select>
          {errors.training && (
            <small className="form-text text-danger">
              Training is required
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
