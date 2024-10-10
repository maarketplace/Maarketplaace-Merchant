import React from "react";
import { Bar } from "react-chartjs-2";
import { AiOutlineArrowUp } from "react-icons/ai";
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
    maintainAspectRatio: true,
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

  return (
    <div className="flex-1 h-[100%] max-[650px]:h-[30%] rounded-md shadow-md p-[10px] w-[100%]">
      <div className="w-[100%] h-[10vh] flex flex-col gap-2 mb-4">
        <div className="w-full flex justify-between">
          <span className="text-sm">Total Revenue</span>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>Profit</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span>Loss</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-20 items-center">
          <span className="font-bold">$50.4k</span>
          <div className="flex space-x-2 items-center">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <AiOutlineArrowUp className="text-green-500" />
            </div>
            <span className="text-green-500">5% more than last month</span>
          </div>
        </div>
      </div>

      <div className="h-[30vh]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
