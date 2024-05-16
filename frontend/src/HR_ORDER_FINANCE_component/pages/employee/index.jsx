import { useState, useMemo } from "react";
import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../../store/useUserStore";
import { useUserData } from "../../hooks/useUserData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import UserAPI from "../../api/UserAPI";
import { BootstrapTable } from "../../components";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";
import { InputGroup, FormControl } from "react-bootstrap";

import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";
import ViewEmployeeModal from "./ViewEmployeeModal";
import AddTrainingModal from "./AddTrainingModal";

const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the state and actions from the store
  const {
    openAddUserModal,
    openEditUserModal,
    openViewUserModal,
    setSelectedUser,
  } = useUserStore((state) => ({
    openAddUserModal: state.openAddUserModal,
    openEditUserModal: state.openEditUserModal,
    openViewUserModal: state.openViewUserModal,
    setSelectedUser: state.setSelectedUser,
  }));

  const [searchTerm, setSearchTerm] = useState("");

  // Get the data from the react-query hook
  const { data, refetch } = useUserData();

  // Delete mutation
  const { mutate } = useMutation(UserAPI.deleteUser, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "User deleted successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Delete function
  const onDelete = (id) => {
    confirmMessage(
      "Are you sure?",
      "This will resign the employee and delete the user. This action cannot be undone.",
      () => {
        mutate(id);
      }
    );
  };

  // Edit function
  const handleEdit = (employee) => {
    setSelectedUser(employee);
    openEditUserModal();
  };

  // PDF report function
  const downloadPDF = () => {
    const employeeCount = data.data.employees.length;
    const additionalInfo = `Total number of employees: ${employeeCount}`;
    generatePDF(
      additionalInfo,
      ["name", "email", "role", "department", "designation"],
      data.data.employees,
      "employees-report"
    );
  };

  const filteredEmployees = useMemo(() => {
    return data?.data?.employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <div className="container mt-2">
      <AddEmployeeModal />
      <EditEmployeeModal />
      <ViewEmployeeModal />
      <AddTrainingModal />

      <h1 className="mb-4">Employees</h1>

      <Button variant="primary" className="m-1" onClick={openAddUserModal}>
        <IoMdAddCircleOutline className="mb-1" /> <span>Add</span>
      </Button>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      {/* Search input */}
      <InputGroup className="mb-3" style={{ width: "300px", float: "right" }}>
        <InputGroup.Text id="basic-addon1">
          <span>Search</span>
        </InputGroup.Text>
        <FormControl
          placeholder="Employee name"
          aria-label="Employee name"
          aria-describedby="basic-addon1"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <div className="mt-4">
        <BootstrapTable
          headers={[
            "Name",
            "Email",
            "Role",
            "Department",
            "Designation",
            "Actions",
          ]}
          children={
            filteredEmployees &&
            filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>
                  <img
                    src={
                      employee.photo ||
                      `https://api.dicebear.com/8.x/micah/svg?seed=${employee?.name}&flip=true&backgroundType=gradientLinear&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`
                    }
                    alt="User Avatar"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: "2px solid #fff",
                    }}
                  />{" "}
                  {employee.name}
                  <span className="badge bg-primary ms-2">
                    {user.email === employee.email && "You"}
                  </span>
                </td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                <td>{employee.department}</td>
                <td>{employee.designation}</td>
                <td className="align-middle">
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    onClick={() => handleEdit(employee)}
                    size="sm"
                  >
                    <MdEditSquare className="mb-1 mx-1" />
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(employee._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="success"
                    onClick={() => {
                      setSelectedUser(employee);
                      openViewUserModal();
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
