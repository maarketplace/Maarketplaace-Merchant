import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    data: number[];
  }[];
}

interface BarChartProps {
  data: BarChartData;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number | string) {
            return typeof value === "number" ? value / 1000 + "k" : value;
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
