import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useBankCommunicationStore } from "../../store/useBankCommunicationStore";
import { useBankCommunicationData } from "../../hooks/useBankCommunicationData";
import { BootstrapModal } from "../../components";
import BankCommunicationAPI from "../../api/BankCommunicationAPI";
import Toast from "../../utils/toast";
import { useState } from "react";
import { handleUpload } from "../../utils/HandleUpload";

const AddBankCommunicationModal = () => {
  // Get the state and actions from the store
  const { isAddBankCommunicationModalOpen, closeAddBankCommunicationModal } =
    useBankCommunicationStore((state) => ({
      isAddBankCommunicationModalOpen: state.isAddBankCommunicationModalOpen,
      closeAddBankCommunicationModal: state.closeAddBankCommunicationModal,
    }));

  // Get refetch function from react-query hook
  const { refetch } = useBankCommunicationData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
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

  // Create mutation
  const { mutate } = useMutation(BankCommunicationAPI.create, {
    onSuccess: () => {
      // reset the percent and document state
      setPercent(0);
      setDocument("");
      // close the modal and refetch the data
      closeAddBankCommunicationModal();
      refetch();
      Toast({
        type: "success",
        message: "BankCommunication created successfully",
      });
    },
    onError: (error) => {
      Toast({ type: "error", message: error.message });
    },
  });

  // Submit function
  const onSubmit = (values) => {
    values.document = document;
    //
    mutate(values);
    reset();
    // reset the percent and document state
    setPercent(0);
    setDocument("");
  };

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
      show={isAddBankCommunicationModalOpen}
      handleClose={closeAddBankCommunicationModal}
      title="Add Bank Communication"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* Content */}
        <div className="form-group">
          <label className="my-2" htmlFor="content">
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
        <div className="form-group">
          <label className="my-2" htmlFor="bank">
            Bank
          </label>
          <select
            className="form-control"
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

        <div className="form-group">
          <label className="my-2" htmlFor="document">
            Upload slip
          </label>
          <input
            type="file"
            className="form-control"
            id="document"
            placeholder="Upload document"
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={handleDocumentUpload}
            disabled={!file || percent === 100}
            // add suitable color to the button
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

        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={percent < 100 || !file || !document}
        >
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddBankCommunicationModal;
