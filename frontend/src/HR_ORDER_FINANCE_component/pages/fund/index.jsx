import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useFundStore } from "../../store/useFundStore";
import { useFundData } from "../../hooks/useFundData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import FundAPI from "../../api/FundAPI";
import AddFundModal from "./AddFundModal";
import EditFundModal from "./EditFundModal";
import { BootstrapTable } from "../../components";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";

const index = () => {
  // Get the state and actions from the store
  const { openAddFundModal, openEditFundModal, setSelectedFund } = useFundStore(
    (state) => ({
      openAddFundModal: state.openAddFundModal,
      openEditFundModal: state.openEditFundModal,
      setSelectedFund: state.setSelectedFund,
    })
  );

  // Get the data from the react-query hook
  const { data, refetch } = useFundData();

  // Delete mutation
  const { mutate } = useMutation(FundAPI.delete, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Fund deleted successfully" });
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
  const handleEdit = (fund) => {
    setSelectedFund(fund);
    openEditFundModal();
  };

  // PDF report function
  const downloadPDF = () => {
    // Calclating the total funds
    const funds = data.data.funds;
    const fundCount = funds.length;
    // add balance amount to each fund
    funds.forEach((fund) => {
      fund.balanceAmount = fund.allocatedAmount - fund.spentAmount;
    });
    //
    const additionalInfo = `Total Funds: ${fundCount}`;
    //
    generatePDF(
      additionalInfo,
      [
        "department",
        "project",
        "allocatedAmount",
        "spentAmount",
        "balanceAmount",
      ],
      data.data.funds,
      "funds-report"
    );
  };

  return (
    <div className="container mt-2">
      <AddFundModal />
      <EditFundModal />

      <h1 className="mb-4">Funds</h1>

      <Button variant="primary" className="m-1" onClick={openAddFundModal}>
        <IoMdAddCircleOutline className="mb-1" /> <span>Add Fund</span>
      </Button>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      <div className="mt-5">
        <BootstrapTable
          headers={[
            "Department",
            "Project",
            "Allocated Amount",
            "Spent Amount",
            "Balance Amount",
            "Actions",
          ]}
          children={
            data &&
            data.data.funds.map((fund) => (
              <tr key={fund._id}>
                <td>{fund.department}</td>
                <td>{fund.project}</td>
                <td>{fund.allocatedAmount}</td>
                <td>{fund.spentAmount || 0}</td>
                <td>
                  <span
                    style={{
                      color:
                        fund.allocatedAmount - fund.spentAmount >= 0
                          ? "green"
                          : "red",
                    }}
                    className="fw-bold"
                  >
                    {fund.allocatedAmount - fund.spentAmount}
                  </span>
                </td>
                <td>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(fund._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                    <span>Delete</span>
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    onClick={() => handleEdit(fund)}
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
