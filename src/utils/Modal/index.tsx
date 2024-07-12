import React, { useEffect } from 'react';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    display?: boolean;
    primary?: boolean;
}

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onClose?: () => void;
    title: string;
    message: string;
    autoClose?: boolean;
    closeAfter?: number;
    primaryButton?: ButtonProps;
    secondaryButton?: ButtonProps;
    isSuccess?: boolean; // Add isSuccess prop to determine the type of message
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    setIsOpen,
    title,
    message,
    autoClose = false,
    closeAfter = 5000,
    primaryButton,
    secondaryButton,
    isSuccess,
}) => {
    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (isOpen && autoClose) {
            timer = setTimeout(() => {
                setIsOpen(false);
            }, closeAfter);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [isOpen, autoClose, closeAfter, setIsOpen]);

    if (!isOpen) return null;

    return (
        <div className="relative inset-0 z-50 flex items-center bg-black bg-opacity-50 p-4 max-[650px]:items-end">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm w-[300px] absolute bottom-[190px] right-[-135px] max-[650px]:bottom-[-40px] max-[650px]:w-[300px]">
                <div className="p-4 border-b flex items-center">
                    <h2 className="text-xl font-semibold mr-2">{title}</h2>
                </div>
                <div className="p-4 flex flex-col items-center justify-center">
                    {isSuccess ? (
                        <img src="/success.svg" alt="Success" className="w-[80px] h-[80px] " />
                    ) : (
                        <img src="error.svg" alt="Error" className="w-[60px] h-[60px]" />
                    )}
                    <p>{message}</p>
                </div>
                <div className="p-4 border-t flex justify-end space-x-2">
                    {secondaryButton?.display && (
                        <button
                            className={`py-2 px-4 rounded ${secondaryButton.primary ? 'bg-[#FFC300] hover:bg-blue-700 text-white' : 'bg-gray-500 hover:bg-gray-700 text-white'}`}
                            onClick={secondaryButton.onClick}
                        >
                            {secondaryButton.text}
                        </button>
                    )}
                    {primaryButton?.display && (
                        <button
                            className={`py-2 px-4 rounded ${primaryButton.primary ? 'bg-[#FFC300] text-white' : 'bg-gray-500 hover:bg-gray-700 text-white'}`}
                            onClick={primaryButton.onClick}
                        >
                            {primaryButton.text}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
