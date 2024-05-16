import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useOrderStore } from "../../store/useOrderStore";
import { useOrderData, useCustomerOrderData } from "../../hooks/useOrderData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import OrderAPI from "../../api/OrderAPI";
import AddOrderModal from "./AddOrderModal";
import EditOrderModal from "./EditOrderModal";
import { BootstrapTable } from "../../components";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { useAuthStore } from "../../store/useAuthStore";
import ViewOrderModal from "./ViewOrderModal";
//
const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the state and actions from the store
  const { openViewOrderModal, openEditOrderModal, setSelectedOrder } =
    useOrderStore((state) => ({
      openViewOrderModal: state.openViewOrderModal,
      openEditOrderModal: state.openEditOrderModal,
      setSelectedOrder: state.setSelectedOrder,
    }));

  // Get the data from the react-query hook
  let result;
  if (user.role === "ORDER_MANAGER") {
    result = useOrderData();
  } else {
    result = useCustomerOrderData();
  }
  const { data, refetch } = result;

  // Delete mutation
  const { mutate } = useMutation(OrderAPI.delete, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Order deleted successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Delete function
  const onDelete = (id) => {
    confirmMessage("Are you sure?", "This action cannot be undone.", () => {
      mutate(id);
    });
  };

  // Edit function
  const handleEdit = (order) => {
    setSelectedOrder(order);
    openEditOrderModal();
  };

  // PDF report function
  const downloadPDF = () => {
    // Calclating the total orders
    const orders = data.data.orders;

    // add new field called customer_name to each order and oderItems
    orders.forEach((order) => {
      order.customer_name = order.customer.name;
      order.itemCount = order.orderItems.length;
    });

    const orderCount = orders.length;
    //
    const additionalInfo = `Total Orders: ${orderCount}`;
    //
    generatePDF(
      additionalInfo,
      ["customer_name", "status", "itemCount", "totalPrice"],
      data.data.orders,
      "orders-report"
    );
  };

  let headers;
  if (user.role === "CUSTOMER") {
    headers = ["Status", "Item Count", "Total Price", "Actions"];
  } else {
    headers = ["Customer", "Status", "Item Count", "Total Price", "Actions"];
  }

  const handleView = (order) => {
    setSelectedOrder(order);
    openViewOrderModal();
  };

  return (
    <div className="container mt-2">
      <AddOrderModal />
      <EditOrderModal />
      <ViewOrderModal />

      <h1 className="mb-4">Orders</h1>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      <div className="mt-5">
        <BootstrapTable
          headers={headers}
          children={
            data &&
            data.data.orders.map((order) => (
              <tr key={order._id}>
                {user.role === "CUSTOMER" ? null : (
                  <td
                    onClick={() => handleView(order)}
                    className="cursor-pointer text-primary underline"
                  >
                    {order.customer.name}
                  </td>
                )}
                <td>
                  <span
                    className={`badge ${
                      order.status === "pending"
                        ? "bg-warning"
                        : order.status === "paid"
                        ? "bg-info"
                        : "bg-success"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{order.orderItems.length}</td>
                <td>Rs.{order.totalPrice}/=</td>
                <td>
                  {user.role === "CUSTOMER" ? null : (
                    <Button
                      className="m-1 px-3"
                      variant="info"
                      onClick={() => handleEdit(order)}
                      size="sm"
                    >
                      <MdEditSquare className="mb-1 mx-1" />
                      <span>Change Status</span>
                    </Button>
                  )}
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(order._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                    <span>Delete</span>
                  </Button>
                </td>
              </tr>
            ))
          }
        />
      </div>
    </div>
  );
};

export default index;
