
import React from "react";

interface BalanceCardProps {
  balance: string | number;
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  isLoading?: boolean;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  title,
  icon,
  variant = 'default',
  isLoading = false
}) => {
  const variantClasses = {
    primary: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-amber-500 text-white',
    default: 'bg-white dark:bg-black text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
  };

  const isColored = variant !== 'default';

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
          <p className={`text-sm font-medium mb-1 ${isColored ? 'text-white' : 'text-gray-600 dark:text-yellow-100'
            }`}>
            {title}
          </p>

          {isLoading ? (
            <div className="animate-pulse">
              <div className={`h-6 rounded w-20 mb-1 ${isColored ? 'bg-white/20' : 'bg-gray-300 dark:bg-gray-600'
                }`}></div>
            </div>
          ) : (
              <p className={`text-xl font-bold mb-1 ${isColored ? 'text-white' : 'text-gray-900 dark:text-[#FFC300]'
              }`}>
              {balance}
            </p>
          )}
        </div>

        <div className={`
          p-2 rounded-lg
          ${isColored
            ? 'bg-white text-white'
            : 'bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-300'
          }
        `}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
