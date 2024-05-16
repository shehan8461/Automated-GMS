import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import EvaluationAPI from "../../api/EvaluationAPI";
import { BootstrapTable } from "../../components";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

import { useEvaluationStore } from "../../store/useEvaluationStore";
import { useEvaluationData } from "../../hooks/useEvaluationData";

import AddEvaluationModal from "./AddEvaluationModal";
import EditEvaluationModal from "./EditEvaluationModal";
import ViewEvaluationModal from "./ViewEvaluationModal";
import { useState } from "react";

const index = () => {
  const {
    openAddEvaluationModal,
    openEditEvaluationModal,
    openViewEvaluationModal,
    setSelectedEvaluation,
  } = useEvaluationStore((state) => ({
    openAddEvaluationModal: state.openAddEvaluationModal,
    openEditEvaluationModal: state.openEditEvaluationModal,
    openViewEvaluationModal: state.openViewEvaluationModal,
    setSelectedEvaluation: state.setSelectedEvaluation,
  }));

  const { data, refetch } = useEvaluationData();
  const { mutate } = useMutation(EvaluationAPI.deleteEvaluation, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Evaluation deleted successfully" });
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
  const handleEdit = (evaluation) => {
    setSelectedEvaluation(evaluation);
    openEditEvaluationModal();
  };

  // State for employee filter
  const [selectedEmployee, setSelectedEmployee] = useState("");

  // Filtered data based on selected employee
  const filteredEvaluations = selectedEmployee
    ? data?.data.evaluations.filter(
        (evaluation) => evaluation?.employee?.name === selectedEmployee
      )
    : data?.data.evaluations || [];

  // Function to handle PDF download
  const downloadPDF = () => {
    const evaluationsToReport = selectedEmployee
      ? filteredEvaluations
      : data.data.evaluations;
    const evaluationCount = evaluationsToReport.length;
    const reportTitle = selectedEmployee
      ? `${selectedEmployee}'s Evaluations Report`
      : "All Evaluations Report";
    const additionalInfo = `Total Evaluations: ${evaluationCount}, Filtered by: ${
      selectedEmployee || "All Employees"
    }`;
    evaluationsToReport.forEach((evaluation) => {
      evaluation.name = evaluation?.employee?.name;
    });

    generatePDF(
      additionalInfo,
      ["name", "date", "marks"],
      evaluationsToReport,
      reportTitle
    );
  };

  return (
    <div className="container mt-2">
      <AddEvaluationModal />
      <EditEvaluationModal />
      <ViewEvaluationModal />

      <h1 className="mb-4">Evaluations</h1>

      {/* Dropdown for selecting employee */}
      <div className="mb-3">
        <select
          className="form-select"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          aria-label="Select Employee"
        >
          <option value="">All Employees</option>
          {data &&
            [
              ...new Set(
                data.data.evaluations.map(
                  (evaluation) => evaluation?.employee?.name
                )
              ),
            ].map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
        </select>
      </div>

      <Button
        variant="primary"
        className="m-1"
        onClick={openAddEvaluationModal}
      >
        <IoMdAddCircleOutline className="mb-1" /> <span>Add</span>
      </Button>

      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      <div className="mt-5">
        <BootstrapTable
          headers={["Employee", "Date", "Marks", "Actions"]}
          children={filteredEvaluations.map((evaluation) => (
            <tr key={evaluation._id}>
              <td>{evaluation?.employee?.name}</td>
              <td>{evaluation.date}</td>
              <td>{evaluation.marks}%</td>
              <td className="align-middle">
                <Button
                  className="m-1 px-3"
                  variant="info"
                  onClick={() => handleEdit(evaluation)}
                  size="sm"
                >
                  <MdEditSquare className="mb-1 mx-1" />
                </Button>
                <Button
                  className="m-1 px-3"
                  variant="danger"
                  onClick={() => onDelete(evaluation._id)}
                  size="sm"
                >
                  <AiTwotoneDelete className="mb-1 mx-1" />
                </Button>
                <Button
                  className="m-1 px-3"
                  variant="success"
                  onClick={() => {
                    setSelectedEvaluation(evaluation);
                    openViewEvaluationModal();
                  }}
                  size="sm"
                >
                  <FaInfoCircle className="mb-1 mx-1" />
                </Button>
              </td>
            </tr>
          ))}
        />
      </div>
    </div>
  );
};

export default index;
