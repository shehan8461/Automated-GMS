import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useExpenseStore } from "../../store/useExpenseStore";
import { useExpenseData } from "../../hooks/useExpenseData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import ExpenseAPI from "../../api/ExpenseAPI";
import AddExpenseModal from "./AddExpenseModal";
import EditExpenseModal from "./EditExpenseModal";
import { BootstrapTable } from "../../components";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";

const index = () => {
  // Get the state and actions from the store
  const { openAddExpenseModal, openEditExpenseModal, setSelectedExpense } =
    useExpenseStore((state) => ({
      openAddExpenseModal: state.openAddExpenseModal,
      openEditExpenseModal: state.openEditExpenseModal,
      setSelectedExpense: state.setSelectedExpense,
    }));

  // Get the data from the react-query hook
  const { data, refetch } = useExpenseData();

  // Delete mutation
  const { mutate } = useMutation(ExpenseAPI.delete, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Expense deleted successfully" });
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
  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    openEditExpenseModal();
  };

  // PDF report function
  const downloadPDF = () => {
    // Calclating the total expenses
    const expenses = data.data.expenses;
    const expenseCount = expenses.length;
    //
    const additionalInfo = `Total Expenses: ${expenseCount}`;
    //
    generatePDF(
      additionalInfo,
      ["category", "amount", "description"],
      data.data.expenses,
      "expenses-report"
    );
  };

  return (
    <div className="container mt-2">
      <AddExpenseModal />
      <EditExpenseModal />

      <h1 className="mb-4">Expenses</h1>

      <Button variant="primary" className="m-1" onClick={openAddExpenseModal}>
        <IoMdAddCircleOutline className="mb-1" /> <span>Add Expense</span>
      </Button>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      <div className="mt-5">
        <BootstrapTable
          headers={[
            "Category",
            "Department",
            "Amount (Rs)",
            "Description",
            "Actions",
          ]}
          children={
            data &&
            data.data.expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.category}</td>
                <td>{expense.department}</td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(expense._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                    <span>Delete</span>
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    onClick={() => handleEdit(expense)}
                    size="sm"
                  >
                    <MdEditSquare className="mb-1 mx-1" />
                    <span>Edit</span>
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
