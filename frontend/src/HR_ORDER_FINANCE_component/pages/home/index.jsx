import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import NavBar from "../../components/NavBar";

const Home = () => {
  const { user, logout } = useAuthStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));
  //
  return (
    <>
      <NavBar />
      <div className="container">
        <header className="bg-light p-5 rounded-lg m-3">
          <h1>Welcome to our Selyn Cloths</h1>
          <p></p>
          {user && (
            <>
              <div className="alert alert-primary" role="alert">
                You are logged in as <strong>{user.role}</strong>
              </div>
              <h3>Welcome, {user.name}</h3>
              <button onClick={logout} className="btn btn-danger">
                Logout
              </button>
              <button className="btn btn-primary mx-2">
                <a
                  href={
                    user.role === "ORDER_MANAGER"
                      ? "/order_manager"
                      : "/customer"
                  }
                  className="text-white text-decoration-none"
                >
                  {user.role === "ORDER_MANAGER"
                    ? "Order Manager Panel"
                    : "Customer Panel"}
                </a>
              </button>
              <button className="btn btn-primary mx-2">
                <a
                  href="/finance-manager"
                  className="text-white text-decoration-none"
                >
                  Finance Manager Dashboard
                </a>
              </button>
              <button className="btn btn-primary mx-2">
                <a
                  // MANAGER, EXECUTIVE, GENERAL
                  href={
                    user.role === "MANAGER"
                      ? "/manager"
                      : user.role === "EXECUTIVE"
                      ? "/executive"
                      : "/general"
                  }
                  className="text-white text-decoration-none"
                >
                  {user.role === "MANAGER"
                    ? "Manager Dashboard"
                    : user.role === "EXECUTIVE"
                    ? "Executive Dashboard"
                    : "General Dashboard"}
                </a>
              </button>
            </>
          )}

          {!user && (
            <>
              <p>
                Please <a href="/login">login</a> to continue
              </p>
              <p>
                Don't have an account? <a href="/signup">Sign up</a>
              </p>
            </>
          )}
        </header>
      </div>
    </>
  );
};

export default Home;
