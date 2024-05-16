import { useTrainingStore } from "../../store/useTrainingStore";
import { BootstrapModal } from "../../components";

const ViewTrainingModal = () => {
  // Get the state and actions from the store
  const { isViewTrainingModalOpen, closeViewTrainingModal, selectedTraining } =
    useTrainingStore((state) => ({
      isViewTrainingModalOpen: state.isViewTrainingModalOpen,
      closeViewTrainingModal: state.closeViewTrainingModal,
      selectedTraining: state.selectedTraining,
    }));

  return (
    <BootstrapModal
      show={isViewTrainingModalOpen}
      handleClose={closeViewTrainingModal}
      title={selectedTraining?.name}
    >
      {/* deatils left side uimage and right side*/}
      <div className="d-flex justify-content-between">
        {/* image */}
        <div>
          <p>
            <strong>Description:</strong> {selectedTraining?.description}
          </p>
          <p>
            <strong>Date & Time:</strong> {selectedTraining?.date} -{" "}
            {selectedTraining?.time}
          </p>
          <p>
            <strong>Departments:</strong> {selectedTraining?.departments}
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-secondary" onClick={closeViewTrainingModal}>
          Close
        </button>
      </div>
    </BootstrapModal>
  );
};

export default ViewTrainingModal;
