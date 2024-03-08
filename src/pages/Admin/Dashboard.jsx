import { useEffect } from "react";
import Cards from "../../components/Admin/Cards";
import { BarChart, LineChart, DoughnutChart } from "../../components/Admin/charts";
import { getDashboardData } from "../../api/admin/dashboard";

const Dashboard = () => {

  const getAdminDashboardData = async () => {
    try {
      const response = await getDashboardData();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdminDashboardData();
  }, []);

  return (
    <div className="container-fluid col-md-10">
      <main className="my-4">
        <div className="row">
          {/* Cards */}
          <Cards title={"title 1"} value={10} />
          <Cards title={"title 2"} value={4} />
          <Cards title={"title 3"} value={7} />
        </div>
      </main>

      {/* Charts */}
      <div className="mb-4">
        <div className="row">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <div className="chart-container">
              <BarChart />
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center mt-4 mt-md-0">
            <div className="chart-container">
              <LineChart />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 d-flex justify-content-center">
            <div className="chart-container">
              <DoughnutChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
