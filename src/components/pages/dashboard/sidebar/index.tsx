import { FiLogOut } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";
import { PiNotebookLight, PiUsersThree } from "react-icons/pi";
import { IoVideocamOutline, IoQrCodeOutline, IoBagHandleOutline, IoStorefrontOutline } from "react-icons/io5";

interface SideBarProps {
    setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({ setShowSidebar }: SideBarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (path: string) => {
        navigate(path);
        if (setShowSidebar) {
            setShowSidebar(false);
        }
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const handleLogoutClick = () => {
        localStorage.clear();
        navigate('/');
    };


    return (
        <div className="w-full h-full">
            <div className="w-full flex flex-col space-y-2 dark:text-white">

                <button
                    className={`flex items-center px-4 py-3 w-full hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors ${isActive('/dashboard') ? 'bg-black text-white border-l-4 border-[#FFC300]' : 'text-black'
                        }`}
                    onClick={() => handleNavigate('/dashboard')}
                >
                    <RxDashboard className="w-5 h-5 mr-3" />
                    <span className="text-sm">Dashboard</span>
                </button>

                <button
                    className={`flex items-center px-4 py-3 w-full hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors ${isActive('/dashboard/store') ? 'bg-black text-white border-l-4 border-[#FFC300]' : 'text-black'
                        }`}
                    onClick={() => handleNavigate('/dashboard/store')}
                >
                    <IoStorefrontOutline className="w-5 h-5 mr-3" />
                    <span className="text-sm">Store</span>
                </button>

                <button
                    className={`flex items-center px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors ${isActive('/dashboard/course/upload') ? 'bg-black text-white border-l-4 border-[#FFC300]' : 'text-black'
                        }`}
                    onClick={() => handleNavigate('/dashboard/course/upload')}
                >
                    <IoVideocamOutline className="w-5 h-5 mr-3" />
                    <span className="text-sm">Upload Course</span>
                </button>

                <button
                    className={`flex items-center px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors ${isActive('/dashboard/ebook/upload') ? 'bg-black text-white border-l-4 border-[#FFC300]' : 'text-black'
                        }`}
                    onClick={() => handleNavigate('/dashboard/ebook/upload')}
                >
                    <PiNotebookLight className="w-5 h-5 mr-3" />
                    <span className="text-sm">Upload E-book</span>
                </button>

                <button
                    className={`flex items-center px-4 py-3 w-full hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors ${isActive('/dashboard/order') ? 'bg-black text-white border-l-4 border-[#FFC300]' : 'text-black'
                        }`}
                    onClick={() => handleNavigate('/dashboard/order')}
                >
                    <IoBagHandleOutline className="w-5 h-5 mr-3" />
                    <span className="text-sm">Order</span>
                </button>

                <button
                    className={`flex items-center px-4 py-3 w-full hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors ${isActive('/dashboard/transaction') ? 'bg-black text-white border-l-4 border-[#FFC300]' : 'text-black'
                        }`}
                    onClick={() => handleNavigate('/dashboard/transaction')}
                >
                    <IoQrCodeOutline className="w-5 h-5 mr-3" />
                    <span className="text-sm">Transaction</span>
                </button>

                <button
                    className={`flex items-center px-4 py-3 w-full hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors ${isActive('/dashboard/customer') ? 'bg-black text-white border-l-4 border-[#FFC300]' : 'text-black'
                        }`}
                    onClick={() => handleNavigate('/dashboard/customer')}
                >
                    <PiUsersThree className="w-5 h-5 mr-3" />
                    <span className="text-sm">Customer</span>
                </button>

                <button
                    className="flex items-center px-4 py-3 w-full hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors text-black"
                    onClick={handleLogoutClick}
                >
                    <FiLogOut className="w-5 h-5 mr-3" />
                    <span className="text-sm">Log out</span>
                </button>

            </div>
        </div>
    );
};

export default SideBar;
