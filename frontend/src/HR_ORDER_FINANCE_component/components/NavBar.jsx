import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { TiShoppingCart } from "react-icons/ti";
import { useShoppingCartStore } from "../store/useShoppingCartStore";
import { USER_ROLES } from "../constants/roles";
import LOGO from "../assets/logo.jpeg";

const NavBar = () => {
  const { cartItems } = useShoppingCartStore();
  const { logout, user } = useAuthStore((state) => ({
    logout: state.logout,
    user: state.user,
  }));
  //
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#6db0fd" }}
    >
      {/* logo */}
      <a className="navbar-brand mx-3" href="/">
        <img
          src={LOGO}
          alt="Logo"
          style={{
            maxWidth: "100%",
            maxHeight: "45px",
            backgroundColor: "#fff",
          }}
          className="rounded"
        />
      </a>

      {/* vertical line using plain css */}
      <div
        className="d-none d-lg-block"
        style={{ borderLeft: "3px solid #fff", height: 40 }}
      ></div>
      {/* shop now link */}
      <a
        className="ms-3 text-decoration-none text-white rounded-pill px-3 py-2 bg-dark"
        href="/shop"
      >
        {user && user.role === USER_ROLES.CUSTOMER ? "Shop Now" : "Products"}
      </a>
      {user && user.role === USER_ROLES.CUSTOMER && (
        <a
          className="ms-3 text-decoration-none text-white rounded-pill px-3 py-2 bg-dark"
          href="/cart"
        >
          <TiShoppingCart size={20} /> Cart{" "}
          <span className="badge bg-danger ms-1">{cartItems.length}</span>
        </a>
      )}

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        {user && (
          <>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-3">
                <img
                  src={`https://api.dicebear.com/8.x/micah/svg?seed=${user?.name}&flip=true&backgroundType=gradientLinear&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`}
                  alt="User Avatar"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "2px solid #fff",
                  }}
                />{" "}
              </li>

              <li className="nav-item mx-2 align-self-center">
                <a
                  className="btn btn-primary btn-sm"
                  href={
                    user?.role === "ORDER_MANAGER"
                      ? "/order_manager"
                      : "/customer"
                  }
                >
                  Dashboard
                </a>
              </li>
              {user && user.role === USER_ROLES.FINANCE_MANAGER && (
                <>
                  <li className="nav-item mx-2 align-self-center">
                    <a
                      className="btn btn-primary btn-sm"
                      href="/finance-manager"
                    >
                      Dashboard
                    </a>
                  </li>
                </>
              )}
              <li className="nav-item mx-2 align-self-center">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    logout();
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
