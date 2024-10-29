import React from "react";
import BarChart from "../overview/BarChart";
import BalanceCard from "../overview/BalancedCard";
import MostSoldItems from "../overview/MostSoldItems";
// import LatestOrders from "../overview/LatestOrder";
import { useMerchant } from "../../../../../context/GetMerchant";
import { formatNumber } from "../../../../../utils/Utils";

const Index: React.FC = () => {
  const {data} = useMerchant()
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

// console.log(data);

  return (
    <div className="w-full overflow-scroll max-[650px]:flex max-[650px]:flex-col max-[650px]:w-[100%] max-[650px]:mt-[40px]">
      <div className="flex gap-2 p-2 max-[650px]:flex-col max-[650px]:gap-[10px] max-[650px]:items-center max-[650px]:w-[100%]">
        <BalanceCard title="Available Balance" balance={formatNumber(data?.balance)} />
        <BalanceCard title="Total Withdraw" balance={data?.totalWithdrawals} />
        <BalanceCard title="Total Products" balance={data?.totalProducts} />
        <BalanceCard title="Total Orders" balance={data?.totalOrders} />
        <BalanceCard title="Total Customers" balance={data?.totalCustomers} />
      </div>

      <div className="flex items-center p-2 w-full gap-2 max-[650px]:flex-col">
        <div className="h-[40%] max-[650px]:w-[100%] max-[650px]:h-[30%] rounded-md shadow-md flex-1">
          <BarChart data={barChartData} />
        </div>
        <div className="w-[65vh] max-[650px]:w-[100%] h-[45vh]">
          <MostSoldItems items={mostSoldItems} />
        </div>
      </div>
    </div>
  );
};

export default Index;
