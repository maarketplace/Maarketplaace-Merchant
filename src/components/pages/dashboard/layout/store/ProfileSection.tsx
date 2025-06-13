import { FaUser } from "react-icons/fa";
import { TbShare, TbUserEdit, TbUsers } from "react-icons/tb";

const ProfileSection = ({
    data,
    onEditClick,
    onShareClick
}: {
    data: {
        data?: {
            image?: string;
            business_name?: string;
            profession?: string;
            bio?: string;
            followedUsers?: string[];
        };
    };
    onEditClick: () => void;
    onShareClick: () => void;
}) => (
    <div className="bg-white dark:bg-black rounded-2xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl">
        <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="relative group">
                {data?.data?.image ? (
                    <div className="relative">
                        <img
                            src={data.data.image}
                            alt="Profile"
                            className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700 transition-transform duration-200 group-hover:scale-105"
                        />
                        <button
                            onClick={onEditClick}
                            className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                            aria-label="Edit profile picture"
                        >
                            <TbUserEdit className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <FaUser className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                    </div>
                )}
            </div>

            <div className="flex-1 text-center lg:text-left">
                {data?.data?.business_name && (
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {data.data.business_name}
                    </h1>
                )}
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                    {data?.data?.profession}
                </p>
                {data?.data?.bio && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
                        {data.data.bio}
                    </p>
                )}
            </div>

            <div className="flex flex-wrap gap-3 max-[650px]:jsutify-center max-[650px]:w-[80%] ">
                <div className="flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg max-[650px]:w-[100%]">
                    <TbUsers className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">
                        {data?.data?.followedUsers?.length || 0} Followers
                    </span>
                </div>
                <button
                    onClick={onShareClick}
                    className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg transition-colors duration-200 max-[650px]:w-[100%]"
                >
                    <TbShare className="w-4 h-4" />
                    Share Store
                </button>
            </div>
        </div>
    </div>
);

export default ProfileSection;
