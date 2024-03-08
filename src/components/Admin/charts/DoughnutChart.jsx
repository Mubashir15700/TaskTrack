import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

const DoughnutChart = () => {
    return (
        <Doughnut
            data={{
                labels: ["Dataset 1", "Dataset 2"],
                datasets: [
                    {
                        data: [300, 200],
                        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
                        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
                        borderWidth: 1,
                    },
                ],
            }}
        />
    );
};

export default DoughnutChart;
