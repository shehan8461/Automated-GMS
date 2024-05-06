import React from "react";
import { Link } from "react-router-dom";
import "./headerStyle.css";

function Header() {
  return (
    <nav className="navbar bg-custom">
      <div className="container">
        <Link className="brand" to="#">
          Supplier Management System
        </Link>
        <div className="menu-container">
          <ul className="menu">
            <li>
              <Link className="lnk active" to="/allSupplier">
                Suppliers
              </Link>
            </li>
            <li>
              <Link className="lnk active" to="/adduser">
                Add New Supplier
              </Link>
            </li>
            <li>
              <Link className="lnk active" to="/allorders">
                Placed Orders
              </Link>
            </li>
            <li>
              <Link className="lnk active" to="/count">
                Dash Board
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
