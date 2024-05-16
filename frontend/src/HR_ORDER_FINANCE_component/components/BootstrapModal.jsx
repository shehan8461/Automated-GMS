import Modal from "react-bootstrap/Modal";

const BootstrapModal = ({ size, show, handleClose, title, children }) => {
  return (
    <>
      <Modal
        size={size ? size : null}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default BootstrapModal;
