import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const BarChart = () => {
  return (
    <Bar
      data={{
        labels: ["Jun", "Jul", "Aug"],
        datasets: [
          {
            label: "Dataset 1",
            data: [5, 6, 7],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Dataset 2",
            data: [3, 2, 1],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};

export default BarChart;
