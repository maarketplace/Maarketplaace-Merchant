import { useEffect, useState } from "react";
import { useMerchant } from "../../../../../context/GetMerchant";
import { formatNumber } from "../../../../../utils/Utils";
import {
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  Eye,
  EyeOff,
} from "lucide-react";
import BalanceCard from "./BalancedCard";
import { useNavigate } from "react-router-dom";
import ProductToast from "../notification";
import { useProductStore } from "../../../../../store";
import { TbCurrencyNaira } from "react-icons/tb";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, fetchMerchant } = useMerchant();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [visible, setVisible] = useState(false);
  const { productId, productName } = useProductStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (productName && productId) setVisible(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [setVisible, productName, productId]);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };
  useEffect(() => {
    fetchMerchant();
  }, [fetchMerchant]);
  const cards = [
    {
      title: "Available Balance",
      balance: isBalanceVisible ? formatNumber(data?.balance) : "••••••",
      icon: <TbCurrencyNaira className="w-6 h-6" />,
    },
    {
      title: "Total Withdrawals",
      balance: isBalanceVisible ? data?.totalWithdrawals : "••••••",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: "Total Products",
      balance: data?.totalProducts,
      icon: <Package className="w-6 h-6" />,
    },
    {
      title: "Total Orders",
      balance: data?.totalOrders,
      icon: <ShoppingCart className="w-6 h-6" />,
    },
    {
      title: "Total Customers",
      balance: data?.totalCustomers,
      icon: <Users className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen dark:bg-black p-4 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-light text-black dark:text-white">
              Dashboard
            </h1>
            <button
              onClick={toggleBalanceVisibility}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {isBalanceVisible ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {isBalanceVisible ? "Hide" : "Show"} Balance
              </span>
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {cards.map((card, index) => (
            <BalanceCard
              key={index}
              title={card.title}
              balance={card.balance}
              icon={card.icon}
              isLoading={isLoading}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-black rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  name: "All Product",
                  icon: Package,
                  route: "/dashboard/store",
                },
                {
                  name: "View Orders",
                  icon: ShoppingCart,
                  route: "/dashboard/order",
                },
                {
                  name: "Customers",
                  icon: Users,
                  route: "/dashboard/customer",
                },
                {
                  name: "Transactions",
                  icon: TrendingUp,
                  route: "/dashboard/transaction",
                },
              ].map((action, index) => (
                <button
                  key={index}
                  onClick={() => navigate(action.route)}
                  className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <action.icon className="w-6 h-6 text-gray-700 dark:text-gray-300 mb-2" />
                  <span className="text-sm font-medium text-black dark:text-white">
                    {action.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {visible ? (
        <ProductToast
          setVisible={setVisible}
          productName={productName || ""}
          productUrl={`https://www.maarketplaace.com/details/${productId}`}
        />
      ) : null}
    </div>
  );
};

export default Dashboard;
