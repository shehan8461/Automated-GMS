import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useBankCommunicationStore } from "../../store/useBankCommunicationStore";
import { useBankCommunicationData } from "../../hooks/useBankCommunicationData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import BankCommunicationAPI from "../../api/BankCommunicationAPI";
import { handleUpload } from "../../utils/HandleUpload";

const EditBankCommunicationModal = () => {
  // Get the state and actions from the store
  const {
    isEditBankCommunicationModalOpen,
    closeEditBankCommunicationModal,
    selectedBankCommunication,
  } = useBankCommunicationStore((state) => ({
    isEditBankCommunicationModalOpen: state.isEditBankCommunicationModalOpen,
    closeEditBankCommunicationModal: state.closeEditBankCommunicationModal,
    selectedBankCommunication: state.selectedBankCommunication,
  }));

  // Get refetch function from react-query hook
  const { refetch } = useBankCommunicationData();

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [document, setDocument] = useState("");
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  // Handle document upload
  const handleDocumentUpload = (e) => {
    // const file = e.target.files[0];
    setFile(file);
    handleUpload({ file, setPercent, setDocument });
  };

  // Handle change
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  // Update mutation
  const { mutate } = useMutation(BankCommunicationAPI.update, {
    onSuccess: () => {
      // reset the percent and document state
      setPercent(0);
      setDocument("");
      // close the modal and refetch the data
      refetch();
      closeEditBankCommunicationModal();
      Toast({
        type: "success",
        message: "Bank Communication updated successfully",
      });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    data.document = document;
    mutate({ id: selectedBankCommunication._id, data });
    reset();
    // reset the percent and document state
    setPercent(0);
    setDocument("");
  };

  useEffect(() => {
    // Set the form values when the selectedBankCommunication changes
    if (selectedBankCommunication) {
      setValue("content", selectedBankCommunication.content);
      setValue("bank", selectedBankCommunication.bank);
      setDocument(selectedBankCommunication.document);
    }
  }, [selectedBankCommunication, setValue]);

  const banks = [
    "Bank of Ceylon (BOC)",
    "Commercial Bank of Ceylon",
    "People's Bank",
    "Hatton National Bank (HNB)",
    "Sampath Bank",
    "National Development Bank (NDB",
    "DFCC Bank",
    "Seylan Bank",
    "HSBC Sri Lanka",
  ];

  return (
    <BootstrapModal
      show={isEditBankCommunicationModalOpen}
      handleClose={closeEditBankCommunicationModal}
      title={`Edit: ${selectedBankCommunication?.bank} Communication`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Content */}
        <div className="mb-2">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <input
            type="text"
            className="form-control"
            id="content"
            name="content"
            {...register("content", { required: true })}
          />
          {errors.content && (
            <small className="form-text text-danger">Content is required</small>
          )}
        </div>

        {/* Bank */}
        <div className="mb-2">
          <label htmlFor="bank" className="form-label">
            Bank
          </label>
          <select
            className="form-select"
            id="bank"
            name="bank"
            {...register("bank", { required: true })}
          >
            <option value="">Select Bank</option>
            {banks.map((bank, index) => (
              <option key={index} value={bank}>
                {bank}
              </option>
            ))}
          </select>
          {errors.bank && (
            <small className="form-text text-danger">Bank is required</small>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="document" className="form-label">
            Current Document
          </label>
          <br />
          <a
            href={selectedBankCommunication?.document}
            download
            target="_blank"
          >
            Download Document
          </a>
        </div>

        {/* document */}
        <div className="form-group mb-3">
          <label htmlFor="document">New Document</label>
          <input
            type="file"
            className="form-control"
            id="document"
            placeholder="Upload document"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={handleDocumentUpload}
            disabled={!file || percent === 100}
            className="btn btn-outline-dark mt-2 btn-sm"
          >
            Upload
          </button>
          <div className="progress mt-2">
            <div
              className={`progress-bar bg-success ${
                percent < 100
                  ? "progress-bar-animated progress-bar-striped"
                  : ""
              }`}
              role="progressbar"
              style={{ width: `${percent}%` }}
              aria-valuenow={percent}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {percent < 100 ? `Uploading ${percent}%` : `Uploaded ${percent}%`}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditBankCommunicationModal;
