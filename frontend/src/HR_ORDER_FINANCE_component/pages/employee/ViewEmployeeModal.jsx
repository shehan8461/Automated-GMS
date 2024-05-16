import { useUserStore } from "../../store/useUserStore";
import { BootstrapModal } from "../../components";

const ViewUserModal = () => {
  // Get the state and actions from the store
  const {
    isViewUserModalOpen,
    closeViewUserModal,
    selectedUser,
    openAddTrainingModal,
  } = useUserStore((state) => ({
    isViewUserModalOpen: state.isViewUserModalOpen,
    closeViewUserModal: state.closeViewUserModal,
    selectedUser: state.selectedUser,
    openAddTrainingModal: state.openAddTrainingModal,
  }));

  return (
    <BootstrapModal
      show={isViewUserModalOpen}
      handleClose={closeViewUserModal}
      title={selectedUser?.name}
    >
      {/* deatils left side uimage and right side*/}
      <div className="d-flex justify-content-between">
        {/* image */}
        <div>
          <p>
            <strong>Email:</strong> {selectedUser?.email}
          </p>
          <p>
            <strong>Role:</strong> {selectedUser?.role}
          </p>
          <p>
            <strong>Department:</strong> {selectedUser?.department}
          </p>
          <p>
            <strong>Designation:</strong> {selectedUser?.designation}
          </p>
          <p>
            <strong>Base Salary:</strong> {selectedUser?.baseSalary}/=
          </p>
          <p>
            <strong>Allowance:</strong> {selectedUser?.allowance}/=
          </p>
          <p>
            <strong>Skill Level:</strong> {selectedUser?.skillLevel}
          </p>
          {/* tranings */}
          {selectedUser?.trainings?.length > 0 && (
            <div>
              <p>
                <strong>Trainings:</strong>
              </p>
              <ul>
                {selectedUser?.trainings?.map((training, index) => (
                  <li key={index}>{training.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* document download link */}
          {selectedUser?.document && (
            <a
              href={selectedUser?.document}
              target="_blank"
              rel="noreferrer"
              className=""
            >
              Download Document
            </a>
          )}
        </div>
        <img
          src={
            selectedUser?.photo ||
            `https://api.dicebear.com/8.x/micah/svg?seed=${selectedUser?.name}&flip=true&backgroundType=gradientLinear&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`
          }
          alt={selectedUser?.name}
          className="img-fluid"
          style={{ maxHeight: "100px" }}
        />
      </div>

      <div className="d-flex justify-content-between mt-5">
        <button
          className="btn btn-primary"
          onClick={() => {
            openAddTrainingModal();
            closeViewUserModal();
          }}
        >
          Add Training
        </button>
        <button className="btn btn-secondary" onClick={closeViewUserModal}>
          Close
        </button>
      </div>
    </BootstrapModal>
  );
};

export default ViewUserModal;
