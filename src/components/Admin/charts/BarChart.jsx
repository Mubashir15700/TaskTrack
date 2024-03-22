import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const BarChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data) {
      const labels = data.map(entry => `${entry._id.year}-${entry._id.month}`);
      const subscriptionData = data.map(entry => entry.totalSubscriptions);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Subscriptions",
            data: subscriptionData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data]);

  return (
    <div>
      {chartData ? <Bar data={chartData} /> : <p>Loading...</p>}
    </div>
  );
};

export default BarChart;
