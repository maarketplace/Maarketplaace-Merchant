import React from "react";
import BalanceCard from "../overview/BalancedCard";
import { useMerchant } from "../../../../../context/GetMerchant";
import { formatNumber } from "../../../../../utils/Utils";
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const navigate = useNavigate()
  const { data } = useMerchant()

  return (
    <div className="w-full overflow-scroll max-[650px]:flex max-[650px]:flex-col max-[650px]:w-[100%] max-[650px]:mt-[40px]">
      <div className="flex gap-2 p-2 max-[650px]:flex-col max-[650px]:gap-[10px] max-[650px]:items-center max-[650px]:w-[100%]">
        <BalanceCard title="Available Balance" balance={formatNumber(data?.balance)} onClick={()=> navigate('/dashboard/transaction')} />
        <BalanceCard title="Total Withdraw" balance={data?.totalWithdrawals} onClick={()=> navigate('/dashboard/transaction')}/>
        <BalanceCard title="Total Products" balance={data?.totalProducts} onClick={()=> navigate('/dashboard/store')}/>
        <BalanceCard title="Total Orders" balance={data?.totalOrders} onClick={()=> navigate('/dashboard/order')}/>
        <BalanceCard title="Total Customers" balance={data?.totalCustomers} onClick={()=> navigate('/dashboard/customer')}/>
      </div>

      <div className="flex items-center p-2 w-full gap-2 max-[650px]:flex-col">
        
      </div>
    </div>
  );
};

export default Index;
