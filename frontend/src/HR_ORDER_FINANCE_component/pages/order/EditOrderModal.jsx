import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useOrderStore } from "../../store/useOrderStore";
import { useOrderData } from "../../hooks/useOrderData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import OrderAPI from "../../api/OrderAPI";

const EditOrderModal = () => {
  // Get the state and actions from the store
  const { isEditOrderModalOpen, closeEditOrderModal, selectedOrder } =
    useOrderStore((state) => ({
      isEditOrderModalOpen: state.isEditOrderModalOpen,
      closeEditOrderModal: state.closeEditOrderModal,
      selectedOrder: state.selectedOrder,
    }));

  // Get refetch function from react-query hook
  const { refetch } = useOrderData();

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Update mutation
  const { mutate } = useMutation(OrderAPI.update, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditOrderModal();
      Toast({ type: "success", message: "Order updated successfully" });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({ id: selectedOrder._id, data });
  };

  useEffect(() => {
    // Set the form values when the selectedOrder changes
    if (selectedOrder) {
      setValue("name", selectedOrder.name);
      setValue("description", selectedOrder.description);
      setValue("price", selectedOrder.price);
      setValue("duration", selectedOrder.duration);
    }
  }, [selectedOrder, setValue]);

  return (
    <BootstrapModal
      show={isEditOrderModalOpen}
      handleClose={closeEditOrderModal}
      title={`Edit: ${selectedOrder?.customer?.name} Order Status`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-select"
            id="status"
            name="status"
            {...register("status", { required: true })}
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="delivered">Delivered</option>
          </select>
          {errors.status && (
            <small className="form-text text-danger">Status is required</small>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditOrderModal;
