import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CheckLoginStatus from "./CheckLoginStatus";
import { USER_ROLES } from "../constants/roles";

import {
  Home,
  Login,
  CustomerSignup,
  OrderManagerDashboard,
  CustomerDashboard,
  Shop,
  ProductDetail,
  Cart,
  Checkout,
  ManagerDashboard,
  FinanceManagerDashboard,
} from "../pages";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Check Login Status */}
          <Route element={<CheckLoginStatus />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<CustomerSignup />} />
          </Route>

          {/* Common Private Routes */}
          <Route
            element={
              <PrivateRoute
                permissionLevel={[
                  USER_ROLES.CUSTOMER,
                  USER_ROLES.ORDER_MANAGER,
                ]}
              />
            }
          >
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Route>

          {/* Customer Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.CUSTOMER]} />}
          >
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          {/* FinanceManager Private Routes */}
          <Route
            element={
              <PrivateRoute permissionLevel={[USER_ROLES.FINANCE_MANAGER]} />
            }
          >
            <Route
              path="/finance-manager"
              element={<FinanceManagerDashboard />}
            />
          </Route>

          {/* OrderManager Private Routes */}
          <Route
            element={
              <PrivateRoute permissionLevel={[USER_ROLES.ORDER_MANAGER]} />
            }
          >
            <Route path="/order_manager" element={<OrderManagerDashboard />} />
          </Route>

          {/* Manager Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.MANAGER]} />}
          >
            <Route path="/manager" element={<ManagerDashboard />} />
          </Route>

          {/* Executive Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.EXECUTIVE]} />}
          >
            <Route
              path="/executive"
              element={
                <>
                  <h1>Executive Dashboard</h1>
                  <button className="btn btn-primary mx-2">
                    <a href="/" className="text-white text-decoration-none">
                      Home
                    </a>
                  </button>
                </>
              }
            />
          </Route>

          {/* General Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.GENERAL]} />}
          >
            <Route
              path="/general"
              element={
                <>
                  <h1>General Dashboard</h1>
                  <button className="btn btn-primary mx-2">
                    <a href="/" className="text-white text-decoration-none">
                      Home
                    </a>
                  </button>
                </>
              }
            />
          </Route>

          {/* return 404 page */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
