import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AuthAPI from "../../api/AuthAPI";
import { useAuthStore } from "../../store/useAuthStore";
import { errorMessage, successMessage } from "../../utils/Alert";
import { useNavigate } from "react-router-dom";
import { USER_ROLES } from "../../constants/roles";

const index = () => {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!email) {
      isValid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      errors.email = "Email is invalid";
    }

    if (!password) {
      isValid = false;
      errors.password = "Password is required";
    } else if (password.length < 6) {
      // Example: Minimum length check
      isValid = false;
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return isValid;
  };

  const redirectToDashboard = (res) => {
    if (res.data.user.role === USER_ROLES.ORDER_MANAGER) {
      navigate("/order_manager");
    } else if (res.data.user.role === USER_ROLES.CUSTOMER) {
      navigate("/customer");
    } else {
      navigate("/");
    }
  };

  const { mutate, isLoading } = useMutation(AuthAPI.login, {
    onSuccess: (res) => {
      // Set user data to global state
      login(res.data.user, res.data.token);
      successMessage("Success", res.data.message, () => {
        redirectToDashboard(res);
      });
    },
    onError: (err) => {
      errorMessage("Error", err.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutate({ email, password });
    }
  };

  return (
    // full height container
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h1 className="card-header text-center">Login</h1>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </form>

              {/* don't have an account */}
              <div className="mt-3 text-center">
                Don't have an account?{" "}
                <a href="/signup" className="text-decoration-none">
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
