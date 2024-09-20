import React from "react";

interface Order {
  product: string;
  orderId: string;
  date: string;
  customerName: string;
  status: string;
  amount: string;
  action: string;
}

interface LatestOrdersProps {
  orders: Order[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Shipped":
      return "bg-green-500";
    case "Pending":
      return "bg-yellow-500";
    case "Delivered":
      return "bg-blue-500";
    case "Cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const LatestOrders: React.FC<LatestOrdersProps> = ({ orders }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h1 className="text-lg font-bold mb-4">Latest Orders</h1>

      <div className="overflow-hidden border border-gray-300 rounded-md">
        <table className="min-w-full text-left table-auto">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="p-2 border-r border-gray-300">Products</th>
              <th className="p-2 border-r border-gray-300">Order ID</th>
              <th className="p-2 border-r border-gray-300">Date</th>
              <th className="p-2 border-r border-gray-300">Customer Name</th>
              <th className="p-2 border-r border-gray-300">Status</th>
              <th className="p-2 border-r border-gray-300">Amount</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody className="h-[20vh] overflow-y-scroll scrollbar-hide">
            {orders.map((order, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="p-2 border-r border-gray-300">{order.product}</td>
                <td className="p-2 border-r border-gray-300">{order.orderId}</td>
                <td className="p-2 border-r border-gray-300">{order.date}</td>
                <td className="p-2 border-r border-gray-300">{order.customerName}</td>
                <td className="p-2 border-r border-gray-300 flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(order.status)}`}></span>
                  {order.status}
                </td>
                <td className="p-2 border-r border-gray-300">{order.amount}</td>
                <td className="p-2 flex justify-center">
                  <button className="text-black font-extrabold flex space-x-3 ">
                    {order.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestOrders;
