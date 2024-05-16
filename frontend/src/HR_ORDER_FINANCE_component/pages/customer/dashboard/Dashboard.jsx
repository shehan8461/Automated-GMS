import React from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useCustomerOrderData } from "../../../hooks/useOrderData";

const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the data from the react-query hook
  const { data: orderData } = useCustomerOrderData(); //["pending", "confirmed", "rescheduled", "rejected"]
  //
  return (
    <div className="container mt-4">
      {user && (
        <div className="alert alert-primary" role="alert">
          You are logged in as <strong>{user.role}</strong>
        </div>
      )}

      <div className="row">
      <h2 className="mb-3">
          {/* greeting message based on the time of the day */}
          {new Date().getHours() < 12
            ? "Good Morning"
            : new Date().getHours() < 18
            ? "Good Afternoon"
            : "Good Evening"}
          , {user && user.name}
        </h2>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">📦 My Orders</h5>
              <p className="card-text fs-4 fw-bold">
                {orderData ? orderData?.data?.orders.length : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
