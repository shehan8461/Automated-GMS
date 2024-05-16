import React, { useState } from "react";
import LOGO from "../../../assets/logo.jpeg";
import { FiLogOut } from "react-icons/fi";
import { useAuthStore } from "../../../store/useAuthStore";
import Dashboard from "./Dashboard";
import Expense from "../../expense";
import Fund from "../../fund";
import BankCommunication from "../../bank_communication";
import { useNavigate } from "react-router-dom";
//
const FinanceManagerSidebar = () => {
  const navigate = useNavigate();
  //
  const [activeContent, setActiveContent] = useState("Dashboard");
  //
  const handleLinkClick = (content) => {
    setActiveContent(content);
  };
  //
  const { logout } = useAuthStore((state) => ({
    logout: state.logout,
  }));
  //
  const renderContent = () => {
    switch (activeContent) {
      case "Dashboard":
        return (
          <>
            <Dashboard />
          </>
        );
      case "Expenses":
        return (
          <>
            <Expense />
          </>
        );
      case "Funds":
        return (
          <>
            <Fund />
          </>
        );
      case "BankCommunications":
        return (
          <>
            <BankCommunication />
          </>
        );
      default:
        return (
          <p>
            Welcome to the application. Please select a link from the sidebar.
          </p>
        );
    }
  };

  // Function to handle logout logic
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  //
  // custom css for nav-link and active nav-link
  const navLinkStyle = {
    color: "#fff",
    backgroundColor: "#ee389b",
  };
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <div
        className="d-flex flex-column flex-shrink-0 p-3"
        style={{ width: "280px", backgroundColor: "#6db0fd" }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <img
            src={LOGO}
            alt="Emerald Bay"
            style={{
              maxWidth: "100%",
              maxHeight: "60px",
              padding: "5px",
              backgroundColor: "#fff",
            }}
            className="rounded"
          />
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a
              href="#dashboard"
              className="nav-link"
              style={
                activeContent === "Dashboard" ? navLinkStyle : { color: "#000" }
              }
              onClick={() => handleLinkClick("Dashboard")}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#expenses"
              className="nav-link"
              style={
                activeContent === "Expenses" ? navLinkStyle : { color: "#000" }
              }
              onClick={() => handleLinkClick("Expenses")}
            >
              Expense Management
            </a>
          </li>
          <li>
            <a
              href="#funds"
              className="nav-link"
              style={
                activeContent === "Funds" ? navLinkStyle : { color: "#000" }
              }
              onClick={() => handleLinkClick("Funds")}
            >
              Fund Management
            </a>
          </li>
          <li>
            <a
              href="#bank-communications"
              className="nav-link"
              style={
                activeContent === "BankCommunications"
                  ? navLinkStyle
                  : { color: "#000" }
              }
              onClick={() => handleLinkClick("BankCommunications")}
            >
              Bank Communications
            </a>
          </li>
        </ul>
        <div className="mt-auto">
          <button
            className="btn btn-dark w-100 d-flex align-items-center justify-content-center"
            onClick={handleLogout}
          >
            <FiLogOut className="me-2" /> Logout
          </button>
        </div>
      </div>
      <div className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
        {renderContent()}
      </div>
    </div>
  );
};
//
export default FinanceManagerSidebar;
