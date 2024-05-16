import { useEvaluationStore } from "../../store/useEvaluationStore";
import { BootstrapModal } from "../../components";

const ViewEvaluationModal = () => {
  // Get the state and actions from the store
  const {
    isViewEvaluationModalOpen,
    closeViewEvaluationModal,
    selectedEvaluation,
  } = useEvaluationStore((state) => ({
    isViewEvaluationModalOpen: state.isViewEvaluationModalOpen,
    closeViewEvaluationModal: state.closeViewEvaluationModal,
    selectedEvaluation: state.selectedEvaluation,
  }));

  return (
    <BootstrapModal
      show={isViewEvaluationModalOpen}
      handleClose={closeViewEvaluationModal}
      title={selectedEvaluation?.employee?.name + "'s Evaluation"}
    >
      {/* deatils left side uimage and right side*/}
      <div className="d-flex justify-content-between">
        {/* image */}
        <div>
          <p>
            <strong>Employee:</strong> {selectedEvaluation?.employee?.name}
          </p>
          <p>
            <strong>Date:</strong> {selectedEvaluation?.date}
          </p>
          <p>
            <strong>Marks:</strong> {selectedEvaluation?.marks}%
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button
          className="btn btn-secondary"
          onClick={closeViewEvaluationModal}
        >
          Close
        </button>
      </div>
    </BootstrapModal>
  );
};

export default ViewEvaluationModal;
