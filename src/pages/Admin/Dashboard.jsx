import Cards from "../../components/Admin/Cards";
import { BarChart, LineChart, DoughnutChart } from "../../components/Admin/charts";

const Dashboard = () => {
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

      <div className="d-md-flex justify-content-between align-items-center mb-5">
        <div className="w-md-50 w-100 d-flex flex-column justify-content-center">
          <BarChart />
          <LineChart />
        </div>
        <DoughnutChart />
      </div>
    </div>
  );
};

export default Dashboard;
