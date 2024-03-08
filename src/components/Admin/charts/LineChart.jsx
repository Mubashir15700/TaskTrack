import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const LineChart = () => {
  return (
    <Line
      datasetIdKey="id"
      data={{
        labels: ["Jun", "Jul", "Aug"],
        datasets: [
          {
            id: 1,
            label: "cvcxv",
            data: [5, 6, 7],
          },
          {
            id: 2,
            label: "vcbb",
            data: [3, 2, 1],
          },
        ],
      }}
    />
  );
};

export default LineChart;
