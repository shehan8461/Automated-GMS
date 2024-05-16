import React from "react";
import NavBar from "../../components/NavBar";
import ProductListing from "./ProductListing";
import { useAuthStore } from "../../store/useAuthStore";
import { USER_ROLES } from "../../constants/roles";

const index = () => {
  const { logout, user } = useAuthStore((state) => ({
    logout: state.logout,
    user: state.user,
  }));
  //
  return (
    <>
      <NavBar />
      <div className="container mt-3">
        <h2>
          {user && user.role === USER_ROLES.CUSTOMER ? "Shop Now" : "Products"}
        </h2>
        <ProductListing />
      </div>
    </>
  );
};

export default index;
