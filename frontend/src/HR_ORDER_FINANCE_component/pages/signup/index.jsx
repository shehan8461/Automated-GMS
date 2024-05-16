import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AuthAPI from "../../api/AuthAPI";
import { errorMessage, successMessage } from "../../utils/Alert";
import { useNavigate } from "react-router-dom";
import { USER_ROLES } from "../../constants/roles";

const index = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!name) {
      isValid = false;
      errors.name = "Name is required";
    } else if (name.length < 3) {
      isValid = false;
      errors.name = "Name must be at least 3 characters";
    }

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

    // confirm password
    if (!confirmPassword) {
      isValid = false;
      errors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword.length < 6) {
      // Example: Minimum length check
      isValid = false;
      errors.confirmPassword = "Confirm Password must be at least 6 characters";
    } else if (confirmPassword !== password) {
      isValid = false;
      errors.confirmPassword = "Confirm Password must match with Password";
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

  const { mutate, isLoading } = useMutation(AuthAPI.signup, {
    onSuccess: (res) => {
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
      mutate({ name, email, password });
    }
  };

  return (
    // full height container
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h1 className="card-header text-center">Signup</h1>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
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
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Signup"}
                </button>
              </form>

              {/* already have an account */}
              <div className="mt-3 text-center">
                Already have an account?{" "}
                <a href="/login" className="text-decoration-none">
                  Login
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
