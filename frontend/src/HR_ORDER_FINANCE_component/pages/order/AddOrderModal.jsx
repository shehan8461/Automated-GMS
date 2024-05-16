import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useOrderStore } from "../../store/useOrderStore";
import { useOrderData } from "../../hooks/useOrderData";
import { BootstrapModal } from "../../components";
import OrderAPI from "../../api/OrderAPI";
import Toast from "../../utils/toast";

const AddOrderModal = () => {
  // Get the state and actions from the store
  const { isAddOrderModalOpen, closeAddOrderModal } = useOrderStore(
    (state) => ({
      isAddOrderModalOpen: state.isAddOrderModalOpen,
      closeAddOrderModal: state.closeAddOrderModal,
    })
  );

  // Get refetch function from react-query hook
  const { refetch } = useOrderData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(OrderAPI.create, {
    onSuccess: () => {
      // close the modal and refetch the data
      closeAddOrderModal();
      refetch();
      Toast({ type: "success", message: "Order created successfully" });
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

  return (
    <BootstrapModal
      show={isAddOrderModalOpen}
      handleClose={closeAddOrderModal}
      title="Add Order"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="form-group">
          <label className="mb-2" htmlFor="name">Name</label>
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
          <label className="mb-2" htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <small className="form-text text-danger">Description is required</small>
          )}
        </div>
        <div className="form-group">
          <label className="mb-2" htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <small className="form-text text-danger">Price is required</small>
          )}
        </div>
        <div className="form-group">
          <label className="mb-2" htmlFor="duration">Duration (in minutes)</label>
          <input
            type="number"
            className="form-control"
            id="duration"
            name="duration"
            {...register("duration", { required: true })}
          />
          {errors.duration && (
            <small className="form-text text-danger">Duration is required</small>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3"
        >
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddOrderModal;
