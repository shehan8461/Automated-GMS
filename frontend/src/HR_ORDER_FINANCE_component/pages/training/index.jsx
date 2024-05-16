import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import TrainingAPI from "../../api/TrainingAPI";
import { BootstrapTable } from "../../components";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

import { useTrainingStore } from "../../store/useTrainingStore";
import { useTrainingData } from "../../hooks/useTrainingData";

import AddTrainingModal from "./AddTrainingModal";
import EditTrainingModal from "./EditTrainingModal";
import ViewTrainingModal from "./ViewTrainingModal";

const index = () => {
  // Get the state and actions from the store
  const {
    openAddTrainingModal,
    openEditTrainingModal,
    openViewTrainingModal,
    setSelectedTraining,
  } = useTrainingStore((state) => ({
    openAddTrainingModal: state.openAddTrainingModal,
    openEditTrainingModal: state.openEditTrainingModal,
    openViewTrainingModal: state.openViewTrainingModal,
    setSelectedTraining: state.setSelectedTraining,
  }));

  // Get the data from the react-query hook
  const { data, refetch } = useTrainingData();

  // Delete mutation
  const { mutate } = useMutation(TrainingAPI.deleteTraining, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Training deleted successfully" });
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
  const handleEdit = (training) => {
    setSelectedTraining(training);
    openEditTrainingModal();
  };

  // PDF report function
  const downloadPDF = () => {
    const trainingCount = data.data.trainings.length;
    //
    const additionalInfo = `Total Trainings: ${trainingCount}`;
    //
    generatePDF(
      additionalInfo,
      ["name", "description", "date", "time", "departments"],
      data.data.trainings,
      "trainings-report"
    );
  };

  return (
    <div className="container mt-2">
      <AddTrainingModal />
      <EditTrainingModal />
      <ViewTrainingModal />

      <h1 className="mb-4">Trainings</h1>

      <Button variant="primary" className="m-1" onClick={openAddTrainingModal}>
        <IoMdAddCircleOutline className="mb-1" /> <span>Add</span>
      </Button>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      <div className="mt-5">
        <BootstrapTable
          headers={[
            "Name",
            "Description",
            "Date & Time",
            "Departments",
            "Actions",
          ]}
          children={
            data &&
            data.data.trainings.map((training) => (
              <tr key={training._id}>
                <td>{training.name}</td>
                <td>{training.description}</td>
                <td>
                  {training.date} - {training.time}
                </td>
                <td>{training.departments}</td>
                <td className="align-middle">
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    onClick={() => handleEdit(training)}
                    size="sm"
                  >
                    <MdEditSquare className="mb-1 mx-1" />
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(training._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="success"
                    onClick={() => {
                      setSelectedTraining(training);
                      openViewTrainingModal();
                    }}
                    size="sm"
                  >
                    <FaInfoCircle className="mb-1 mx-1" />
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
