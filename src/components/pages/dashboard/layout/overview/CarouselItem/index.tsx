interface CarouselItemProps {
  image: string;
  title: string;
  subTitle: string;
  description: string;
  logo: string;
  rating: number;
  author: string;
  duration: number;
  pages: string;
}
import { AiOutlineShoppingCart } from "react-icons/ai";

const CarouselItem: React.FC<CarouselItemProps & { index: number }> = ({
  image,
  title,
  subTitle,
  description,
  logo,
  rating,
  author,
  duration,
  pages,
  index,
}) => {
  const renderStarWithDynamicFill = (rating: number, index: number) => {
    const normalizedRating = Math.max(0, Math.min(rating, 5));
    const fillPercentage = `${(normalizedRating / 5) * 100}%`;
    const gradientId = `half-fill-${index}`;
  
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
            <stop offset={fillPercentage} stopColor="yellow" />
            <stop offset={fillPercentage} stopColor="gray" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l2.917 8.955h9.426l-7.641 5.46L17.36 24 12 18.882 6.64 24l1.658-7.585L.656 10.955h9.426z"
          fill={`url(#${gradientId})`}
        />
      </svg>
    );
  };
  
  

  return (
    <div className="w-[22%] min-w-[250px] h-[95%] flex-shrink-0 flex justify-center items-center rounded-lg">
      <div className="bg-white w-[95%] shadow-lg h-[95%] flex flex-col items-center rounded-lg justify-center">
        <div className="w-full h-[50%] bg-gray-600 rounded-lg">
          <img
            src={`./${image}`}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-[50%] flex flex-col items-center p-2">
          <div className="w-full space-x-2 space-y-1">
            <div className="w-full flex items-center gap-4 font-bold">
              <button className="bg-yellow-400 rounded-full px-1">
                {logo}
              </button>
              <h1 className="font-bold text-md">{title}</h1>
            </div>
            <span className="font-semibold">{subTitle}</span>
            <p className="text-xs break-words">{description}</p>
          </div>
          <div className="w-full">
            <div className="flex p-2 space-x-1">
              <div className="flex items-center justify-center gap-1 ">
              {renderStarWithDynamicFill(rating, index)}
                <p className="text-xs font-medium">
                {Number(rating).toFixed(1)}{" "}
                  <span className="text-xs">(5+reviews)</span>
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex gap-1 rounded-xl h-7 items-center justify-center p-1 bg-yellow-400">
                <div className="w-4 h-4 rounded-full flex items-center justify-center">
                    <AiOutlineShoppingCart className="text-black w-4 h-4" />
                  </div>
                  <button className="text-xs font-medium">Add to cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex h-8 text-sm items-center space-x-1">
            <div className="w-16 flex items-center justify-center">
              <span>{author}</span>
            </div>
            <div className="w-20 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
              <span>{pages} Pages</span>
            </div>
            <div className="w-16 flex items-center space-x-1 justify-center">
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
              <div className="">
                <span>{duration} min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
