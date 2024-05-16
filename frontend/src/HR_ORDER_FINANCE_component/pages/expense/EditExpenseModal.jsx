import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useExpenseStore } from "../../store/useExpenseStore";
import { useExpenseData } from "../../hooks/useExpenseData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import ExpenseAPI from "../../api/ExpenseAPI";

const EditExpenseModal = () => {
  // Get the state and actions from the store
  const { isEditExpenseModalOpen, closeEditExpenseModal, selectedExpense } =
    useExpenseStore((state) => ({
      isEditExpenseModalOpen: state.isEditExpenseModalOpen,
      closeEditExpenseModal: state.closeEditExpenseModal,
      selectedExpense: state.selectedExpense,
    }));

  // Get refetch function from react-query hook
  const { refetch } = useExpenseData();

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Update mutation
  const { mutate } = useMutation(ExpenseAPI.update, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditExpenseModal();
      Toast({ type: "success", message: "Expense updated successfully" });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({ id: selectedExpense._id, data });
  };

  useEffect(() => {
    // Set the form values when the selectedExpense changes
    if (selectedExpense) {
      setValue("category", selectedExpense.category);
      setValue("amount", selectedExpense.amount);
      setValue("description", selectedExpense.description);
    }
  }, [selectedExpense, setValue]);

  const categories = [
    "Food",
    "Transport",
    "Rent",
    "Utilities",
    "Entertainment",
    "Education",
    "Health",
    "Insurance",
    "Miscellaneous",
  ];

  return (
    <BootstrapModal
      show={isEditExpenseModalOpen}
      handleClose={closeEditExpenseModal}
      title={`Edit: ${selectedExpense?.category} Expense`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* category */}
        <div className="mb-2">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            {...register("category", { required: true })}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <small className="form-text text-danger">
              Category is required
            </small>
          )}
        </div>

        {/* Department */}
        <div className="mb-2">
          <label htmlFor="department" className="form-label">
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

        {/* amount */}
        <div className="mb-2">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            {...register("amount", { required: true })}
          />
          {errors.amount && (
            <small className="form-text text-danger">Amount is required</small>
          )}
        </div>

        {/* description */}
        <div className="mb-2">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <small className="form-text text-danger">
              Description is required
            </small>
          )}
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditExpenseModal;
