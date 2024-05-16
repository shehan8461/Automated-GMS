import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../../store/useUserStore";
import { useUserData } from "../../hooks/useUserData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import UserAPI from "../../api/UserAPI";
import { handleUpload } from "../../utils/HandleUpload";
import { USER_ROLES } from "../../constants/roles";
import { DEPARTMENTS } from "../../constants/departments";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";

const editEmployeeSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Email is invalid" }),
  role: z
    .string({ message: "Role is required" })
    .min(1, { message: "Role is required" }),
  baseSalary: z
    .string({ message: "Base Salary is required" })
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .refine((val) => parseInt(val, 10) > 0, {
      message: "Base salary must be greater than 0",
    }),
  allowance: z
    .string({ message: "Allowance is required" })
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .refine((val) => parseInt(val, 10) >= 0, {
      message: "Allowance must be greater than or equal to 0",
    }),
  designation: z
    .string({ message: "Designation is required" })
    .min(3, { message: "Designation must be at least 3 characters" }),
  department: z
    .string({ message: "Department is required" })
    .min(1, { message: "Department is required" }),
  skillLevel: z
    .string({ message: "Skill Level is required" })
    .min(3, { message: "Skill Level must be at least 3 characters" }),
});

const EditUserModal = () => {
  const { isEditUserModalOpen, closeEditUserModal, selectedUser } =
    useUserStore((state) => ({
      isEditUserModalOpen: state.isEditUserModalOpen,
      closeEditUserModal: state.closeEditUserModal,
      selectedUser: state.selectedUser,
    }));

  const { refetch } = useUserData();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(editEmployeeSchema),
  });

  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  const [document, setDocument] = useState("");
  const [documentFile, setDocumentFile] = useState("");
  const [documentPercent, setDocumentPercent] = useState(0);

  const [currentDesignation, setCurrentDesignation] = useState("");
  const [initialBaseSalary, setInitialBaseSalary] = useState(0);

  const handleImageUpload = () => {
    handleUpload({ file, setPercent, setFunc: setImage });
  };

  const handleDocumentUpload = () => {
    handleUpload({
      file: documentFile,
      setPercent: setDocumentPercent,
      setFunc: setDocument,
    });
  };

  const handleImageChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDocumentChange = (event) => {
    setDocumentFile(event.target.files[0]);
  };

  const { mutate } = useMutation(UserAPI.updateUser, {
    onSuccess: () => {
      setPercent(0);
      setImage("");
      setDocumentPercent(0);
      setDocument("");
      refetch();
      closeEditUserModal();
      Toast({ type: "success", message: "Employee updated successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error.message });
    },
  });

  const onSubmit = (data) => {
    data.photo = image;
    data.document = document;
    data.baseSalary = parseFloat(data.baseSalary) || 0;
    data.allowance = parseFloat(data.allowance) || 0;

    mutate({ id: selectedUser._id, data });
    reset();
    setPercent(0);
    setImage("");
    setDocumentPercent(0);
    setDocument("");
  };

  useEffect(() => {
    if (selectedUser) {
      setValue("name", selectedUser.name);
      setValue("email", selectedUser.email);
      setValue("role", selectedUser.role);
      setValue("baseSalary", selectedUser?.baseSalary?.toString());
      setValue("allowance", selectedUser?.allowance?.toString());
      setValue("designation", selectedUser.designation);
      setValue("department", selectedUser.department);
      setValue("skillLevel", selectedUser.skillLevel);
      setImage(selectedUser.photo);
      setDocument(selectedUser.document);

      setCurrentDesignation(selectedUser.designation);
      setInitialBaseSalary(selectedUser.baseSalary);
    }
  }, [selectedUser, setValue]);

  useEffect(() => {
    if (currentDesignation === selectedUser?.designation) {
      // setValue("baseSalary", initialBaseSalary);
      setValue("baseSalary", initialBaseSalary.toString());
    }
  }, [currentDesignation]);

  return (
    <BootstrapModal
      show={isEditUserModalOpen}
      handleClose={closeEditUserModal}
      title={`Edit: ${selectedUser?.name}`}
      size={"lg"}
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="d-flex justify-content-between">
          <div>
            <div className="form-group">
              <label className="my-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                name="name"
                {...register("name")}
                onChange={(e) => {
                  setValue("name", e.target.value.replace(/[^a-zA-Z\s]/g, ""));
                  trigger("name");
                }}
              />
              {errors.name && (
                <small className="form-text text-danger">
                  {errors.name.message || "Name is required"}
                </small>
              )}
            </div>

            <div className="form-group">
              <label className="my-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                {...register("email")}
                onChange={(e) => {
                  setValue("email", e.target.value);
                  trigger("email");
                }}
              />
              {errors.email && (
                <small className="form-text text-danger">
                  {errors.email.message || "Email is required"}
                </small>
              )}
            </div>

            <div className="form-group">
              <label className="my-2" htmlFor="role">
                Role
              </label>
              <select
                className="form-control"
                id="role"
                name="role"
                {...register("role")}
              >
                {Object.values(USER_ROLES).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.role && (
                <small className="form-text text-danger">
                  Role is required
                </small>
              )}
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col">
                  <label
                    className="my-2 d-flex justify-content-start gap-3"
                    htmlFor="baseSalary"
                  >
                    <span>Base Salary (Rs)</span>
                    <span
                      className="ml-2"
                      title={
                        currentDesignation === selectedUser?.designation
                          ? "Base salary is locked"
                          : "Base salary is unlocked"
                      }
                    >
                      {currentDesignation === selectedUser?.designation ? (
                        <FaLock color="red" />
                      ) : (
                        <FaUnlock color="green" />
                      )}
                    </span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="baseSalary"
                    name="baseSalary"
                    {...register("baseSalary")}
                    onChange={(e) => {
                      setValue("baseSalary", e.target.value);
                      trigger("baseSalary");
                    }}
                    disabled={currentDesignation === selectedUser?.designation}
                  />
                  {errors.baseSalary && (
                    <small className="form-text text-danger">
                      {errors.baseSalary.message || "Base Salary is required"}
                    </small>
                  )}
                </div>
                <div className="col">
                  <label className="my-2" htmlFor="allowance">
                    Allowance (Rs)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="allowance"
                    name="allowance"
                    {...register("allowance")}
                    onChange={(e) => {
                      setValue("allowance", e.target.value);
                      trigger("allowance");
                    }}
                  />
                  {errors.allowance && (
                    <small className="form-text text-danger">
                      {errors.allowance.message || "Allowance is required"}
                    </small>
                  )}
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col">
                  <label className="my-2" htmlFor="designation">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="designation"
                    name="designation"
                    {...register("designation")}
                    onChange={(e) => {
                      setValue(
                        "designation",
                        e.target.value.replace(/[^a-zA-Z\s]/g, "")
                      );
                      trigger("designation");
                      setCurrentDesignation(
                        e.target.value.replace(/[^a-zA-Z\s]/g, "")
                      );
                    }}
                  />
                  {errors.designation && (
                    <small className="form-text text-danger">
                      Designation is required
                    </small>
                  )}
                </div>
                <div className="col">
                  <label className="my-2" htmlFor="department">
                    Department
                  </label>
                  <select
                    className="form-control"
                    id="department"
                    name="department"
                    {...register("department", { required: true })}
                    style={{
                      maxHeight: "100px",
                      overflowY: "scroll",
                    }}
                  >
                    {Object.values(DEPARTMENTS).map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <small className="form-text text-danger">
                      Department is required
                    </small>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="vr mx-3"></div>

          <div>
            <div className="form-group">
              <label className="my-2" htmlFor="skillLevel">
                Skill Level
              </label>
              <input
                type="text"
                className="form-control"
                id="skillLevel"
                name="skillLevel"
                {...register("skillLevel")}
                onChange={(e) => {
                  setValue(
                    "skillLevel",
                    e.target.value.replace(/[^a-zA-Z\s]/g, "")
                  );
                  trigger("skillLevel");
                }}
              />
              {errors.skillLevel && (
                <small className="form-text text-danger">
                  Skill Level is required
                </small>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Current Image
              </label>
              <br />
              <img
                src={
                  selectedUser?.photo ||
                  `https://api.dicebear.com/8.x/micah/svg?seed=${selectedUser?.name}&flip=true&backgroundType=gradientLinear&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`
                }
                alt={selectedUser?.name}
                width="50"
                height="50"
              />
            </div>

            <div className="form-group">
              <label className="my-2" htmlFor="image">
                Photo
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                placeholder="Upload image"
                onChange={handleImageChange}
              />
              <button
                type="button"
                onClick={handleImageUpload}
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
                  {percent < 100
                    ? `Uploading ${percent}%`
                    : `Uploaded ${percent}%`}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="my-2" htmlFor="document">
                Document
              </label>
              <input
                type="file"
                className="form-control"
                id="document"
                placeholder="Upload document"
                onChange={handleDocumentChange}
              />
              <button
                type="button"
                onClick={handleDocumentUpload}
                disabled={!documentFile || documentPercent === 100}
                className="btn btn-outline-dark mt-2 btn-sm"
              >
                Upload
              </button>
              <div className="progress mt-2">
                <div
                  className={`progress-bar bg-success ${
                    documentPercent < 100
                      ? "progress-bar-animated progress-bar-striped"
                      : ""
                  }`}
                  role="progressbar"
                  style={{ width: `${documentPercent}%` }}
                  aria-valuenow={documentPercent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {documentPercent < 100
                    ? `Uploading ${documentPercent}%`
                    : `Uploaded ${documentPercent}%`}
                </div>
              </div>
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

export default EditUserModal;
