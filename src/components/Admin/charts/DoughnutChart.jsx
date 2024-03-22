import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ data }) => {
    return (
        <div>
            {data ? (
                <Doughnut
                    data={{
                        labels: ["Laborers", "Employers"],
                        datasets: [
                            {
                                data: [data.laborersCount, data.employersCount],
                                backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
                                borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
                                borderWidth: 1,
                            },
                        ],
                    }}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DoughnutChart;
