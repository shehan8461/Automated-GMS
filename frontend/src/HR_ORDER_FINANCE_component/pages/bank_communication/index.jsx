import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useBankCommunicationStore } from "../../store/useBankCommunicationStore";
import { useBankCommunicationData } from "../../hooks/useBankCommunicationData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import BankCommunicationAPI from "../../api/BankCommunicationAPI";
import AddBankCommunicationModal from "./AddBankCommunicationModal";
import EditBankCommunicationModal from "./EditBankCommunicationModal";
import { BootstrapTable } from "../../components";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";

const index = () => {
  // Get the state and actions from the store
  const {
    openAddBankCommunicationModal,
    openEditBankCommunicationModal,
    setSelectedBankCommunication,
  } = useBankCommunicationStore((state) => ({
    openAddBankCommunicationModal: state.openAddBankCommunicationModal,
    openEditBankCommunicationModal: state.openEditBankCommunicationModal,
    setSelectedBankCommunication: state.setSelectedBankCommunication,
  }));

  // Get the data from the react-query hook
  const { data, refetch } = useBankCommunicationData();

  // Delete mutation
  const { mutate } = useMutation(BankCommunicationAPI.delete, {
    onSuccess: () => {
      refetch();
      Toast({
        type: "success",
        message: "Bank Communication deleted successfully",
      });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Delete function
  const onDelete = (id) => {
    confirmMessage("Are you sure?", "This action cannot be undone.", () => {
      mutate(id);
    });
  };

  // Edit function
  const handleEdit = (bankCommunication) => {
    setSelectedBankCommunication(bankCommunication);
    openEditBankCommunicationModal();
  };

  // PDF report function
  const downloadPDF = () => {
    // Calclating the total bankCommunications
    const bankCommunications = data.data.bankCommunications;
    const bankCommunicationCount = bankCommunications.length;
    //
    const additionalInfo = `Total BankCommunications: ${bankCommunicationCount}`;
    //
    generatePDF(
      additionalInfo,
      ["content", "bank"],
      data.data.bankCommunications,
      "bankCommunications-report"
    );
  };

  return (
    <div className="container mt-2">
      <AddBankCommunicationModal />
      <EditBankCommunicationModal />

      <h1 className="mb-4">Bank Communications</h1>

      <Button
        variant="primary"
        className="m-1"
        onClick={openAddBankCommunicationModal}
      >
        <IoMdAddCircleOutline className="mb-1" />{" "}
        <span>Add Bank Communication</span>
      </Button>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      <div className="mt-5">
        <BootstrapTable
          headers={["Content", "Bank", "Document", "Actions"]}
          children={
            data &&
            data.data.bankCommunications.map((bankCommunication) => (
              <tr key={bankCommunication._id}>
                <td>{bankCommunication.content}</td>
                <td>{bankCommunication.bank}</td>
                {/* document download link */}
                <td>
                  <a href={bankCommunication.document} download target="_blank">
                    Download Document
                  </a>
                </td>
                <td>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(bankCommunication._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                    <span>Delete</span>
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    onClick={() => handleEdit(bankCommunication)}
                    size="sm"
                  >
                    <MdEditSquare className="mb-1 mx-1" />
                    <span>Edit</span>
                  </Button>
                </td>
              </tr>
            ))
          }
        />
      </div>
    </div>
  );
};

export default index;
