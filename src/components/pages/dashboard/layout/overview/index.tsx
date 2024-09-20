import React from "react";
import BarChart from "../overview/BarChart"; 
import BalanceCard from "../overview/BalancedCard";
import MostSoldItems from "../overview/MostSoldItems";
import LatestOrders from "../overview/LatestOrder";

const Index: React.FC = () => {
  const barChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Profit",
        backgroundColor: "rgba(0, 102, 204, 1)",
        borderColor: "rgba(0, 102, 204, 1)",
        borderWidth: 1,
        data: [
          100000, 120000, 110000, 90000, 105000, 100000, 95000, 80000, 70000,
          95000, 85000, 60000,
        ],
      },
      {
        label: "Loss",
        backgroundColor: "rgba(255, 0, 0, 1)",
        borderColor: "rgba(255, 0, 0, 1)",
        borderWidth: 1,
        data: [
          60000, 80000, 70000, 50000, 60000, 65000, 70000, 55000, 50000, 45000,
          65000, 75000,
        ],
      },
    ],
  };

  const mostSoldItems = [
    { name: "E-book", percentage: 75 },
    { name: "Course", percentage: 50 },
    { name: "PDF", percentage: 40 },
    { name: "Doc", percentage: 80 },
    { name: "E-book2", percentage: 15 },
    { name: "Course2", percentage: 5 },
    { name: "PDF2", percentage: 100 },
    { name: "Doc2", percentage: 10 },
  ];

  const latestOrders = [
    {
      product: "React",
      orderId: "13235",
      date: "2023-09-12",
      customerName: "Yusuf",
      status: "Cancelled",
      amount: "$120.00",
      action: "...",
    },
    {
      product: "Javascript",
      orderId: "34336",
      date: "2023-09-11",
      customerName: "Abu David",
      status: "Pending",
      amount: "$150.00",
      action: "...",
    },
    {
      product: "Vue",
      orderId: "63737",
      date: "2023-09-10",
      customerName: "Mario",
      status: "Delivered",
      amount: "$100.00",
      action: "...",
    },
    {
      product: "Python",
      orderId: "34434",
      date: "2023-09-12",
      customerName: "Destiny",
      status: "Cancelled",
      amount: "$120.00",
      action: "...",
    },
    {
      product: "Java",
      orderId: "93790",
      date: "2023-09-11",
      customerName: "Suliton",
      status: "Shipped",
      amount: "$150.00",
      action: "...",
    },
    {
      product: "Kotlin",
      orderId: "12347",
      date: "2023-09-10",
      customerName: "Adebayo",
      status: "Delivered",
      amount: "$100.00",
      action: "...",
    },
  ];

  return (
    <div className="space-y-4 w-full">
      <div className="flex space-x-5 p-2">
        <BalanceCard title="Available Balance" balance={12345.67} />
        <BalanceCard title="Total Withdraw" balance={5432.10} />
        <BalanceCard title="Total Products" balance={1200} />
        <BalanceCard title="Total Orders" balance={400} />
        <BalanceCard title="Total Customers" balance={150} />
      </div>

      <div className="flex items-center p-2 space-x-2">
        <div className="h-[40vh] overflow-hidden rounded-md shadow-md flex-1">
          <BarChart data={barChartData} />
        </div>
        <div className="w-[65vh] h-[40vh]">
          <MostSoldItems items={mostSoldItems} />
        </div>
      </div>

      <div className="overflow-hidden border border-gray-300 rounded-md">
        <LatestOrders orders={latestOrders} />
      </div>
    </div>
  );
};

export default Index;
