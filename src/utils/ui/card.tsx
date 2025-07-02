import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiCalendar, PiTicketBold } from "react-icons/pi";

interface BalanceCardProps {
  balance: string | number;
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "primary" | "success" | "warning";
  isLoading?: boolean;
}

interface TicketCardProps {
  category: string;
  eventName: string;
  startDate: string;
  location: string;
  totalLeft: number;
  price: number;
  imageUrl: string;
  ticketID: string;
}

export function TicketCard({
  category,
  eventName,
  startDate,
  location,
  totalLeft,
  price,
  imageUrl,
  ticketID,
}: TicketCardProps) {
  return (
    <div className="rounded-md border border-gray-300 dark:border-gray-700  p-4 space-y-8">
      {imageUrl ? (
        <div className="h-[180px] w-full">
          <img
            src={imageUrl}
            alt={eventName}
            height={300}
            className="h-full rounded-md w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full py-16 bg-[#262626] rounded-md">
          <PiTicketBold color="#FFCC00" size={42} />
        </div>
      )}

      <div>
        <p className="bg-[#FFC300] w-fit px-2 rounded-2xl text-black text-base mb-2">
          {category}
        </p>
        <p className="font-bold text-[#FFC300] text-[20px] mb-2">{eventName}</p>
        <p className="text-sm flex items-center gap-2 mb-2">
          <PiCalendar size={16} /> {startDate}
        </p>
        <p className="text-sm flex items-center gap-2">
          <HiOutlineLocationMarker size={16} /> {location}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="font-bold text-[#FFC300] text-[24px]">{price}</span>
          <span className="text-xs"> {totalLeft} tickets left</span>
        </div>
        <a href={`/dashboard/ticket/${ticketID}`}>
          <button className="w-fit bg-black  text-white border border-[#FFC300] font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 hover:bg-[#FFC300] hover:text-black">
            Edit
          </button>
        </a>
      </div>
    </div>
  );
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  title,
  icon,
  variant = "default",
  isLoading = false,
}) => {
  const variantClasses = {
    primary: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-amber-500 text-white",
    default:
      "bg-white dark:bg-black text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700",
  };

  const isColored = variant !== "default";

  return (
    <div
      className={`
        rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer
        ${variantClasses[variant]}
        w-full
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p
            className={`text-sm font-medium mb-1 ${
              isColored ? "text-white" : "text-gray-600 dark:text-gray-200"
            }`}
          >
            {title}
          </p>

          {isLoading ? (
            <div className="animate-pulse">
              <div
                className={`h-6 rounded w-20 mb-1 ${
                  isColored ? "bg-white/20" : "bg-gray-300 dark:bg-gray-600"
                }`}
              ></div>
            </div>
          ) : (
            <p
              className={`text-xl font-bold mb-1 ${
                isColored ? "text-white" : "text-gray-900 dark:text-white"
              }`}
            >
              {balance}
            </p>
          )}
        </div>

        <div
          className={`
          p-2 rounded-lg
          ${
            isColored
              ? "bg-white text-white"
              : "bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-300"
          }
        `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

import { ShoppingBag, Tag } from "lucide-react";
import { useState } from "react";

export interface ProductCardProps {
  product: {
    id: string;
    productName: string;
    productPrice: number;
    productImage: string;
    category: string;
    subCategory: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [copied, setCopied] = useState(false);

  const productUrl = `https://www.maarketplaace.com/details/${product.id}`;
  const copyLink = () => {
    navigator.clipboard.writeText(productUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="border rounded-md border-gray-200 dark:border-gray-700 p-4 space-y-8">
      {product.productImage ? (
        <div className="h-[180px] w-full">
          <img
            src={product.productImage}
            alt={product.productName}
            className="h-full w-full object-cover rounded-md"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full py-16 bg-[#262626]">
          <ShoppingBag color="#FFCC00" size={42} />
        </div>
      )}

      <div className="p-2 space-y-2 h-[100px]">
        <p className="bg-[#FFC300] w-fit px-2 rounded-2xl text-black text-base mb-2">
          {product.category}
        </p>
        <p className="font-semibold text-[#FFC300] text-[20px] mb-2">
          {product.productName}
        </p>
        <p className="text-sm flex items-center gap-2">
          <Tag size={16} /> {product.subCategory}
        </p>
      </div>

      <div className="flex items-center justify-between p-2">
        <span className="font-semibold text-[#FFC300]">
          <p>₦{product.productPrice?.toLocaleString()}</p>
          <span className="text-xs">In stock</span>
        </span>
        <span>
          <button
            onClick={copyLink}
            className="flex items-center gap-2 text-black dark:text-white border border-[#FFC300] font-medium py-1 px-6 rounded-md transition-colors duration-200 hover:bg-[#FFC300] hover:text-black"
          >
            {copied ? "Copied!" : "Share"}
          </button>
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
