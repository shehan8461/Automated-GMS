import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Toast from "../utils/toast";
import { USER_ROLES } from "../constants/roles";

const CheckLoginStatus = () => {
  const user = useAuthStore.getState().user;

  if (!user) {
    return <Outlet />;
  }

  const permissionLevel = user.role;

  if (permissionLevel === USER_ROLES.CUSTOMER) {
    Toast({ type: "success", message: "Welcome back!" });
    return <Navigate to="/user" />;
  }
  if (permissionLevel === USER_ROLES.ORDER_MANAGER) {
    return <Navigate to="/order_manager" />;
  }
  if (permissionLevel === USER_ROLES.MANAGER) {
    return <Navigate to="/manager" />;
  }
  if (permissionLevel === USER_ROLES.EXECUTIVE) {
    return <Navigate to="/executive" />;
  }
  if (permissionLevel === USER_ROLES.FINANCE_MANAGER) {
    Toast({ type: "success", message: "Welcome back!" });
    return <Navigate to="/finance-manager" />;
  }
  if (permissionLevel === USER_ROLES.GENERAL) {
    return <Navigate to="/general" />;
  } else {
    return <Outlet />;
  }
};

export default CheckLoginStatus;
