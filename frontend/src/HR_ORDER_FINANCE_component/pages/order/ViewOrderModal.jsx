import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useOrderStore } from "../../store/useOrderStore";
import { useOrderData } from "../../hooks/useOrderData";
import { BootstrapModal } from "../../components";
import OrderAPI from "../../api/OrderAPI";
import Toast from "../../utils/toast";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { useAuthStore } from "../../store/useAuthStore";

const ViewOrderModal = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  // Get the state and actions from the store
  const { isViewOrderModalOpen, closeViewOrderModal, selectedOrder } =
    useOrderStore((state) => ({
      isViewOrderModalOpen: state.isViewOrderModalOpen,
      closeViewOrderModal: state.closeViewOrderModal,
      selectedOrder: state.selectedOrder,
    }));
  //
  return (
    <BootstrapModal
      show={isViewOrderModalOpen}
      handleClose={closeViewOrderModal}
      title="View Order"
    >
      <div className="container mt-2">
        {selectedOrder && (
          <div>
            <p>
              Customer Name: <strong>{selectedOrder.customer.name}</strong>
            </p>
            <p>
              Order Items:
              <ul>
                {selectedOrder.orderItems.map((item) => (
                  <li key={item.product._id}>
                    {/* show color, size, material */}
                    <a href={`/product/${item.product._id}`}>
                      {item.product.name}
                    </a>{" "}
                    - {item.quantity} units = Rs.{" "}
                    {item.product.price * item.quantity} (Size: {item.size},
                    Color: {item.color}, Material: {item.material})
                  </li>
                ))}
              </ul>
            </p>
            <p>
              Shipping Address: <strong>{selectedOrder.shippingAddress}</strong>
            </p>
            <p>
              Status: <strong>{selectedOrder.status}</strong>
            </p>
            <p>
              Total Price: <strong>Rs. {selectedOrder.totalPrice}</strong>
            </p>
          </div>
        )}
      </div>
    </BootstrapModal>
  );
};

export default ViewOrderModal;
