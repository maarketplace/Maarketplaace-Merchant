import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

interface BalanceCardProps {
  balance: number;
  title: string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance, title }) => {
  return (
    <div className="flex w-[250px]  bg-white p-2 shadow-md rounded-md justify-between gap-[10px] max-[650px]:w-[100%] max-[650px]:justify-between">
      <div className="flex flex-col gap-3">
        <p>{title}</p>
        <p>{balance}</p>
      </div>
      <div className="w-[25px] h-[25px] bg-black flex items-center justify-center text-white rounded-full">
        <AiOutlineShoppingCart />
      </div>
    </div>
  );
};

export default BalanceCard;
