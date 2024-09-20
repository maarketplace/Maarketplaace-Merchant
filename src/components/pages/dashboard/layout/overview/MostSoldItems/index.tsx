import React from "react";

interface SoldItem {
  name: string;
  percentage: number;
}

interface MostSoldItemsProps {
  items: SoldItem[];
}

const MostSoldItems: React.FC<MostSoldItemsProps> = ({ items }) => {
  return (
    <div className="bg-white w-[65vh] h-[40vh] rounded-md shadow-md p-4">
      <h1 className="text-lg font-bold">Most Sold Items</h1>

      <div className="mt-4 space-y-4 h-[30vh] overflow-y-auto scrollbar-hide">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="w-20">{item.name}</span>
            <div className="relative flex-1 h-2 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 h-2 bg-blue-600 rounded-full"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            <span className="w-12 text-right">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostSoldItems;
