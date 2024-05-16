import React, { useState } from "react";
import LOGO from "../../../assets/logo.jpeg";
import { FiLogOut } from "react-icons/fi";
import { useAuthStore } from "../../../store/useAuthStore";
import Dashboard from "./Dashboard";
import Order from "../../order";
//
const CustomerSidebar = () => {
  const [activeContent, setActiveContent] = useState("Dashboard");
  //
  const handleLinkClick = (content) => {
    setActiveContent(content);
  };
  //
  const { logout, user } = useAuthStore((state) => ({
    logout: state.logout,
    user: state.user,
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
      case "Orders":
        return (
          <>
            <Order />
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
    window.location.href = "/login";
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
            alt="logo"
            style={{ maxWidth: "100%", maxHeight: "60px", padding: "5px", backgroundColor: "#fff" }}
            className="rounded"
          />
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a
              href="#dashboard"
              // className={`nav-link ${
              //   activeContent === "Dashboard" ? "active" : "link-dark"
              // }`}
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
              href="#orders"
              className="nav-link"
              style={
                activeContent === "Orders" ? navLinkStyle : { color: "#000" }
              }
              onClick={() => handleLinkClick("Orders")}
            >
              {user.role === "CUSTOMER" && <span>My Orders</span>}
              {user.role === "ADMIN" && <span>Orders</span>}
            </a>
          </li>
          <hr />
          <li className="nav-item mt-2">
            <a
              href="/shop"
              className="nav-link bg-dark text-white"
              style={
                activeContent === "Shop" ? navLinkStyle : { color: "#000" }
              }
            >
              {/* show the user this will take them to the shop using emoji */}
              Shop Now 🛒
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
export default CustomerSidebar;
