import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

interface BalanceCardProps {
  balance: number;
  title: string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance, title }) => {
  return (
    <div className="flex space-x-14 bg-white p-1.5 shadow-md rounded-md">
      <div className="flex flex-col gap-3">
        <p>{title}</p>
        <p>{balance.toFixed(2)}</p>
      </div>
      <div className="w-6 h-6 bg-black flex items-center justify-center text-white rounded-full">
        <AiOutlineShoppingCart />
      </div>
    </div>
  );
};

export default BalanceCard;
