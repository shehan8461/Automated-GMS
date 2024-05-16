import React, { useState, useMemo } from "react";
import Button from "react-bootstrap/Button";
import { BootstrapTable } from "../../components";
import { useMutation } from "@tanstack/react-query";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import PayrollAPI from "../../api/PayrollAPI";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { usePayrollStore } from "../../store/usePayrollStore";
import { usePayrollData } from "../../hooks/usePayrollData";
import EditPayrollModal from "./EditPayrollModal";
import ViewPayrollModal from "./ViewPayrollModal";
import "./PayrollsTable.css";

const Index = () => {
  const { openEditPayrollModal, setSelectedPayroll, openViewPayrollModal } =
    usePayrollStore((state) => ({
      openEditPayrollModal: state.openEditPayrollModal,
      setSelectedPayroll: state.setSelectedPayroll,
      openViewPayrollModal: state.openViewPayrollModal,
    }));

  const { data, refetch } = usePayrollData();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // Extract years and months
  const years = useMemo(() => {
    const years = new Set(data?.data?.payrolls.map((p) => p.year));
    return Array.from(years);
  }, [data]);

  const months = useMemo(() => {
    const months = new Set(data?.data?.payrolls.map((p) => p.month));
    return Array.from(months);
  }, [data]);

  // Filter data based on selection
  const filteredData = useMemo(() => {
    console.log(
      data?.data?.payrolls.filter(
        (p) =>
          (selectedYear ? p.year === selectedYear : true) &&
          (selectedMonth ? p.month === selectedMonth : true)
      )
    );

    return data?.data?.payrolls.filter(
      (p) =>
        (selectedYear ? p.year === selectedYear : true) &&
        (selectedMonth ? p.month === selectedMonth : true)
    );
  }, [data, selectedYear, selectedMonth]);

  // Handle deletions and mutations
  const { mutate } = useMutation(PayrollAPI.deletePayroll, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Payroll deleted successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  const onDelete = (id) => {
    confirmMessage("Are you sure?", "This action cannot be undone.", () =>
      mutate(id)
    );
  };

  const handleEdit = (payroll) => {
    setSelectedPayroll(payroll);
    openEditPayrollModal();
  };

  const clearFilters = () => {
    setSelectedYear("");
    setSelectedMonth("");
  };

  return (
    <div className="container mt-2">
      <EditPayrollModal />
      <ViewPayrollModal />
      <h1 className="mb-4">Payrolls</h1>

      {/* Year and Month Selectors with Bootstrap Styling */}
      <div className="row g-3 align-items-center justify-content-start">
        <div className="col-md-4">
          <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="year-select">
                Year
              </label>
            </div>
            <select
              id="year-select"
              className="form-control"
              value={selectedYear}
              onChange={(e) => {
                // convert to number and set selected year
                const year = parseInt(e.target.value, 10);
                setSelectedYear(year);
              }}
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-4">
          <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="month-select">
                Month
              </label>
            </div>
            <select
              id="month-select"
              className="form-control"
              value={selectedMonth}
              onChange={(e) => {
                // convert to number and set selected month
                const month = parseInt(e.target.value, 10);
                setSelectedMonth(month);
              }}
            >
              <option value="">Select Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-4">
          <Button variant="secondary" onClick={clearFilters} className="w-100">
            Clear
          </Button>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="mt-5">
        <BootstrapTable
          headers={[
            "Employee",
            "Year & Month",
            "Total Payable Salary",
            "Actions",
          ]}
          children={
            filteredData &&
            filteredData.map((payroll) => (
              <tr key={payroll._id}>
                <td>{payroll?.employee?.name}</td>
                <td>{`${payroll.year}/${payroll.month}`}</td>
                <td>{payroll.totalPayableSalary}/=</td>
                <td className="align-middle">
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    onClick={() => handleEdit(payroll)}
                    size="sm"
                  >
                    <MdEditSquare className="mb-1 mx-1" />
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(payroll._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="success"
                    onClick={() => {
                      setSelectedPayroll(payroll);
                      openViewPayrollModal();
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

export default Index;
