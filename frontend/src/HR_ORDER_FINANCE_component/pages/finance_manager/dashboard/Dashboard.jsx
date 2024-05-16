import { useBankCommunicationCount } from "../../../hooks/useBankCommunicationData";
import {
  useExpenseCount,
  useTotalAmountThisMonth,
} from "../../../hooks/useExpenseData";
import { useFundCount } from "../../../hooks/useFundData";
import { useAuthStore } from "../../../store/useAuthStore";
import { useTotalSales } from "../../../hooks/useOrderData";

const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the data from the react-query hook
  const { data: expenseCount } = useExpenseCount();
  const { data: totalAmountThisMonth } = useTotalAmountThisMonth();
  const { data: fundCount } = useFundCount();
  const { data: bankCommunicationCount } = useBankCommunicationCount();
  const { data: totalSales } = useTotalSales();
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
              <h5 className="card-title">💸 Total Expenses Count</h5>
              <p className="card-text fs-4 fw-bold">
                {expenseCount ? expenseCount?.data?.count : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">{`📅 Expenses for (${new Date().toLocaleString(
                "default",
                {
                  month: "long",
                }
              )})`}</h5>
              <p className="card-text fs-4 fw-bold">
                {totalAmountThisMonth
                  ? totalAmountThisMonth?.data?.totalAmount
                  : 0}
                /=
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">💰 Total Funds Count</h5>
              <p className="card-text fs-4 fw-bold">
                {fundCount ? fundCount?.data?.count : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">🏦 Total Bank Communications Count</h5>
              <p className="card-text fs-4 fw-bold">
                {bankCommunicationCount
                  ? bankCommunicationCount?.data?.count
                  : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">💵 Total Sales</h5>
              <p className="card-text fs-4 fw-bold">
                Rs.{totalSales ? totalSales?.data?.totalSales : 0}/=
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
