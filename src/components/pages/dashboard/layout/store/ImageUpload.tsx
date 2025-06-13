import { MdClose } from "react-icons/md";
import Loading from "../../../../../loader";

const ImageUploadModal = ({
    isOpen,
    imagePreview,
    onConfirm,
    onCancel,
    isLoading
}: {
    isOpen: boolean;
    imagePreview: string | null;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading: boolean;
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-black rounded-2xl shadow-2xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Update Profile Picture
                    </h3>
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <MdClose className="w-6 h-6" />
                    </button>
                </div>

                {imagePreview && (
                    <div className="mb-6 flex justify-center">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700"
                        />
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loading width="16px" height="16px" />
                                Updating...
                            </>
                        ) : (
                            "Update Picture"
                        )}
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageUploadModal;

