import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { errorMessage } from "../utils/Alert";

const PrivateRoute = ({ permissionLevel }) => {
	// permissionLevel is an array of strings
  const isAuthenticated = useAuthStore.getState().isAuthenticated;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const user = useAuthStore.getState().user;

	// If the user has the required permission level, render the component
	if (permissionLevel.includes(user.role)) {
		return <Outlet />;
  } else {
		errorMessage("Error", "You do not have permission to access this page");
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
