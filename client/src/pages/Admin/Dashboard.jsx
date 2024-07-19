import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Cards from "../../components/Admin/Cards";
import { BarChart, LineChart, DoughnutChart } from "../../components/Admin/charts";
import { getDashboardData } from "../../api/admin/dashboard";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    totalUsers: null,
    totalJobs: null,
    activeSubscriptions: null
  });
  const [barChartData, setBarChartData] = useState([]);
  const [doughnutChartData, setDoughnutChartData] = useState({});

  const getAdminDashboardData = async () => {
    try {
      const response = await getDashboardData();
      setCounts({
        totalUsers: response.totalUsers,
        totalJobs: response.totalJobs,
        activeSubscriptions: response.activeSubscriptions
      });
      setBarChartData(response.barChartData);
      setDoughnutChartData(response.doughnutChartData);
    } catch (error) {
      toast.error("Error while fetching dashboard data");
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
          <Cards title={"Total User"} value={counts.totalUsers} />
          <Cards title={"Total Jobs"} value={counts.totalJobs} />
          <Cards title={"Active Subscriptions"} value={counts.activeSubscriptions} />
        </div>
      </main>

      {/* Charts */}
      <div className="mb-4">
        <div className="row">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <div className="chart-container">
              <BarChart data={barChartData} />
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center mt-4 mt-md-0">
            <div className="chart-container">
              <LineChart data={barChartData} />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 d-flex justify-content-center">
            <div className="chart-container">
              <DoughnutChart data={doughnutChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
