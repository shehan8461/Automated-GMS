import { usePayrollStore } from "../../store/usePayrollStore";
import { BootstrapModal } from "../../components";

const ViewPayrollModal = () => {
  // Get the state and actions from the store
  const { isViewPayrollModalOpen, closeViewPayrollModal, selectedPayroll } =
    usePayrollStore((state) => ({
      isViewPayrollModalOpen: state.isViewPayrollModalOpen,
      closeViewPayrollModal: state.closeViewPayrollModal,
      selectedPayroll: state.selectedPayroll,
    }));

  return (
    <BootstrapModal
      show={isViewPayrollModalOpen}
      handleClose={closeViewPayrollModal}
      title={
        selectedPayroll?.employee?.name +
        "'s Payroll for " +
        selectedPayroll?.month +
        "/" +
        selectedPayroll?.year
      }
      size={"lg"}
    >
      <div className="d-flex justify-content-between">
        <div className="row">
          <div className="col-md-6">
            {/* Left Column Details */}
            <p>
              <strong>Employee ID:</strong> {selectedPayroll?.employee?._id}
            </p>
            <p>
              <strong>Attendance:</strong> {selectedPayroll?.attendance}
            </p>
            <p>
              <strong>No Pay:</strong> {selectedPayroll?.noPay}/=
            </p>
            <p>
              <strong>OT Hours:</strong> {selectedPayroll?.otHours}
            </p>
            <p>
              <strong>OT Payment:</strong> {selectedPayroll?.otPayment}/=
            </p>
            <p>
              <strong>EPF from Employee:</strong>{" "}
              {selectedPayroll?.epf_fromEmployee}/=
            </p>
            <p>
              <strong>EPF from Employer:</strong>{" "}
              {selectedPayroll?.epf_fromEmployer}/=
            </p>
          </div>

          <div className="col-md-6 border-left px-2">
            {/* Right Column Details */}
            <p>
              <strong>ETF:</strong> {selectedPayroll?.etf}/=
            </p>
            <p>
              <strong>Adjustment:</strong> {selectedPayroll?.adjustment}/=
            </p>
            <p>
              <strong>Special Payment:</strong>{" "}
              {selectedPayroll?.specialPayment}/=
            </p>
            <p>
              <strong>Gross Earning:</strong> {selectedPayroll?.grossEarning}/=
            </p>
            <p>
              <strong>Total Deduction:</strong>{" "}
              {selectedPayroll?.totalDeduction}/=
            </p>
            <p>
              <strong>Total Payable Salary:</strong>{" "}
              {selectedPayroll?.totalPayableSalary}/=
            </p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-secondary" onClick={closeViewPayrollModal}>
          Close
        </button>
      </div>
    </BootstrapModal>
  );
};

export default ViewPayrollModal;
