import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import { TbPlus } from "react-icons/tb";
import { IProduct } from "../../../../../interface/ProductInterface";

const ProductCard = ({
    product,
    onQuicksClick,
    onEditClick,
    onDeleteClick,
    isDeleting
}: {
    product: IProduct;
    onQuicksClick: () => void;
    onEditClick: () => void;
    onDeleteClick: () => void;
    isDeleting: boolean;
}) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="bg-white dark:bg-black rounded-xl  shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group">
            <div className="relative">
                <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        <FaEllipsisV className="w-3 h-3" />
                    </button>

                    {showMenu && (
                        <div className="absolute top-12 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 py-2 min-w-[120px] z-10">
                            <button
                                onClick={() => {
                                    onEditClick();
                                    setShowMenu(false);
                                }}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-blue-600 dark:text-blue-400"
                            >
                                <FaEdit className="w-3 h-3" />
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    onDeleteClick();
                                    setShowMenu(false);
                                }}
                                disabled={isDeleting}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-red-600 dark:text-red-400 disabled:opacity-50"
                            >
                                <FaTrash className="w-3 h-3" />
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {product.productName}
                </h3>
                <button
                    onClick={onQuicksClick}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <TbPlus className="w-4 h-4" />
                    Add Quicks
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

