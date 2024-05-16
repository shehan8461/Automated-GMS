import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { usePayrollStore } from "../../store/usePayrollStore";
import { usePayrollData } from "../../hooks/usePayrollData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import PayrollAPI from "../../api/PayrollAPI";

const EditPayrollModal = () => {
  // Get the state and actions from the store
  const { isEditPayrollModalOpen, closeEditPayrollModal, selectedPayroll } =
    usePayrollStore((state) => ({
      isEditPayrollModalOpen: state.isEditPayrollModalOpen,
      closeEditPayrollModal: state.closeEditPayrollModal,
      selectedPayroll: state.selectedPayroll,
    }));

  // Get refetch function from react-query hook
  const { refetch } = usePayrollData();

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Update mutation
  const { mutate } = useMutation(PayrollAPI.updatePayroll, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditPayrollModal();
      Toast({ type: "success", message: "Payroll updated successfully" });
    },
    onError: (error) => {
      console.error(error);
      reset();
      closeEditPayrollModal();
      Toast({
        type: "error",
        message: error?.response?.data?.message || "An error occurred",
      });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    // convert the data to number
    data.attendance = Number(data.attendance);
    data.noPay = Number(data.noPay);
    data.otHours = Number(data.otHours);
    data.adjustment = Number(data.adjustment);
    data.specialPayment = Number(data.specialPayment);
    //
    mutate({ id: selectedPayroll._id, data });
    reset();
  };

  useEffect(() => {
    // Set the form values when the selectedPayroll changes
    if (selectedPayroll) {
      setValue("attendance", selectedPayroll.attendance);
      setValue("noPay", selectedPayroll.noPay);
      setValue("otHours", selectedPayroll.otHours);
      setValue("adjustment", selectedPayroll.adjustment);
      setValue("specialPayment", selectedPayroll.specialPayment);
    }
  }, [selectedPayroll, setValue]);

  return (
    <BootstrapModal
      show={isEditPayrollModalOpen}
      handleClose={closeEditPayrollModal}
      title={`Edit: ${selectedPayroll?.employee?.name}'s Payroll for ${selectedPayroll?.month}/${selectedPayroll?.year}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label htmlFor="attendance" className="form-label">
            Attendance
          </label>
          <input
            type="text"
            className="form-control"
            id="attendance"
            name="attendance"
            {...register("attendance", { required: true })}
          />
          {errors.attendance && (
            <small className="form-text text-danger">
              Attendance is required
            </small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="noPay" className="form-label">
            No Pay
          </label>
          <input
            type="text"
            className="form-control"
            id="noPay"
            name="noPay"
            {...register("noPay", { required: true })}
          />
          {errors.noPay && (
            <small className="form-text text-danger">No Pay is required</small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="otHours" className="form-label">
            OT Hours
          </label>
          <input
            type="text"
            className="form-control"
            id="otHours"
            name="otHours"
            {...register("otHours", { required: true })}
          />
          {errors.otHours && (
            <small className="form-text text-danger">
              OT Hours is required
            </small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="adjustment" className="form-label">
            Adjustment
          </label>
          <input
            type="text"
            className="form-control"
            id="adjustment"
            name="adjustment"
            {...register("adjustment", { required: true })}
          />
          {errors.adjustment && (
            <small className="form-text text-danger">
              Adjustment is required
            </small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="specialPayment" className="form-label">
            Special Payment
          </label>
          <input
            type="text"
            className="form-control"
            id="specialPayment"
            name="specialPayment"
            {...register("specialPayment", { required: true })}
          />
          {errors.specialPayment && (
            <small className="form-text text-danger">
              Special Payment is required
            </small>
          )}
        </div>

        <button type="submit" className="btn btn-primary  mt-3">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditPayrollModal;
