import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useExpenseStore } from "../../store/useExpenseStore";
import { useExpenseData } from "../../hooks/useExpenseData";
import { BootstrapModal } from "../../components";
import ExpenseAPI from "../../api/ExpenseAPI";
import Toast from "../../utils/toast";

const AddExpenseModal = () => {
  // Get the state and actions from the store
  const { isAddExpenseModalOpen, closeAddExpenseModal } = useExpenseStore(
    (state) => ({
      isAddExpenseModalOpen: state.isAddExpenseModalOpen,
      closeAddExpenseModal: state.closeAddExpenseModal,
    })
  );

  // Get refetch function from react-query hook
  const { refetch } = useExpenseData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(ExpenseAPI.create, {
    onSuccess: () => {
      // close the modal and refetch the data
      closeAddExpenseModal();
      refetch();
      Toast({ type: "success", message: "Expense created successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error.message });
    },
  });

  // Submit function
  const onSubmit = (values) => {
    // covert the amount to number
    values.amount = Number(values.amount);
    mutate(values);
    reset();
  };

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
      show={isAddExpenseModalOpen}
      handleClose={closeAddExpenseModal}
      title="Add Expense"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* Category */}
        <div className="form-group">
          <label className="my-2" htmlFor="category">
            Category
          </label>
          <select
            className="form-control"
            id="category"
            name="category"
            {...register("category", { required: true })}
          >
            <option value="">Select Category</option>
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

        {/* Amount */}
        <div className="form-group">
          <label className="my-2" htmlFor="amount">
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

        {/* Description */}
        <div className="form-group">
          <label className="my-2" htmlFor="description">
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

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddExpenseModal;
