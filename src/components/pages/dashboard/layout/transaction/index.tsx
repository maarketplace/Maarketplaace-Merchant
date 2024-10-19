import { useQuery, useMutation } from "react-query";
import { useEffect, useState } from "react";
import { fetchBanks, getMerchantBalance } from "../../../../../api/query";
import { verifyMerchantAccountNumber, withdrawFunds } from "../../../../../api/mutation"; // Import withdrawFunds API
import { formatNumber } from "../../../../../utils/Utils";
import { IAccountDetails, IBanks } from "../../../../../interface/AccountDetails";

const Transaction = () => {
    const [balance, setBalance] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const [bankDetails, setBankDetails] = useState({ bankName: '', accountNumber: '', bankCode: '' });
    const [amount, setWithdrawAmount] = useState(0); // Amount for step 2
    const [verifiedAccountDetails, setVerifiedAccountDetails] = useState<IAccountDetails | null>(null); // Store verified account details here

    const { data: balanceData } = useQuery(['getMerchantBalance'], getMerchantBalance, {});
    const { data: banksData, isLoading: isBanksLoading } = useQuery('fetchBanks', fetchBanks);

    const { mutate: verifyAccount, isLoading: isVerifying, isError: isVerificationError } = useMutation(
        ['verifyMerchantAccountNumber'],
        verifyMerchantAccountNumber,
        {
            onSuccess: (data) => {
                console.log("Account verified successfully:", data?.data?.data);
                setVerifiedAccountDetails(data?.data?.data); // Save the response to state
                setModalStep(2); // Move to the second modal step
            },
            onError: (error) => {
                console.error("Error verifying account:", error);
                alert("Failed to verify account. Please try again.");
            },
        }
    );

    const { mutate: submitWithdrawal, isLoading: isWithdrawing } = useMutation(
        ['withdrawFunds'],
        withdrawFunds,
        {
            onSuccess: (response) => {
                console.log("Withdrawal successful:", response);
                closeModal();
                alert("Withdrawal request submitted successfully.");
            },
            onError: (error) => {
                console.error("Error processing withdrawal:", error);
                alert("Failed to process withdrawal. Please try again.");
            },
        }
    );

    useEffect(() => {
        if (balanceData?.data?.data) {
            setBalance(balanceData?.data?.data?.data?.balance);
        }
        // console.log(balanceData);

    }, [balanceData]);

    const openModal = () => {
        setIsModalOpen(true);
        setModalStep(1);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalStep(1); // Reset to step 1 when closing
    };

    const handleBankDetailsSubmit = () => {
        if (bankDetails.bankName && bankDetails.accountNumber && bankDetails.bankCode) {
            verifyAccount({
                account_number: bankDetails.accountNumber,
                bank_code: bankDetails.bankCode,
            });
        } else {
            alert("Please fill in all the bank details.");
        }
    };

    const handleWithdrawSubmit = () => {
        if (amount && verifiedAccountDetails) {
            const amountAsNumber = Number(amount); // Convert to number
            if (isNaN(amountAsNumber)) {
                alert("Please enter a valid number for the withdrawal amount.");
                return;
            }
    
            // Pass the amount as a number to the API
            submitWithdrawal({
                amount: amountAsNumber,
                id: verifiedAccountDetails._id,
            });
        } else {
            alert("Please enter an amount to withdraw.");
        }
    };
    

    return (
        <div className="w-[100%] flex h-[89vh] justify-center p-[10px] max-[650px]:p-0">
            <div className="w-[90%] h-[150px] flex justify-between items-center border-b-[1px] border-b-grey-500 max-[650px]:flex-col max-[650px]:mt-[40px] max-[650px]:gap-[10px]">
                <span className="w-[50%] flex flex-col gap-2 max-[650px]:w-[100%]">
                    <p className="font-light text-[12px]">Account Balance (NGN)</p>
                    <p className="text-[30px] font-medium">{formatNumber(balance)}.00</p>
                    <p className="font-light text-[12px]">Withdrawable balance</p>
                </span>
                <span className="w-[50%] flex justify-end max-[650px]:w-[100%] max-[650px]:justify-start max-[650px]:mb-[10px]">
                    <button
                        className="w-[120px] h-[30px] rounded-[8px] bg-[#FFc300] font-medium text-[14px]"
                        onClick={openModal}
                    >
                        Withdraw
                    </button>
                </span>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-[30%] max-[650px]:w-[95%]">
                        {modalStep === 1 && (
                            <div className="w-[100%] flex flex-col gap-[30px]">
                                <span className="w-[100%] border-b-[1px] border-b-grey-500 h-[100px] ">
                                    <h2 className="text-[20px] font-Semibold mb-4 dark:text-black">Withdraw Funds to Bank Account</h2>
                                    <p className="text-[14px] font-light">Select your destination account and fill in the details to withdraw.</p>
                                </span>
                                <span>
                                    <select
                                        className="border p-2 mb-4 w-full dark:text-black outline-none text-black text-[12px]"
                                        onChange={(e) => {
                                            const selectedBank = banksData?.data?.data.find((bank: { name: string }) => bank.name === e.target.value);
                                            setBankDetails({
                                                ...bankDetails,
                                                bankName: selectedBank?.name,
                                                bankCode: selectedBank?.code,
                                            });
                                        }}
                                        value={bankDetails.bankName}
                                    >
                                        <option value="" className="dark:text-black font-light ">Select a bank</option>
                                        {!isBanksLoading && banksData?.data?.data.map((bank: IBanks) => (
                                            <option key={bank.code} value={bank.name} className="dark:text-black">
                                                {bank.name}
                                            </option>
                                        ))}
                                    </select>

                                    <input
                                        type="text"
                                        placeholder="Account Number"
                                        className="border p-2 mb-4 w-full dark:text-black outline-none text-[12px]"
                                        value={bankDetails.accountNumber}
                                        onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                                    />
                                </span>
                                <span className="w-[100%] bg-[#ebebeb] p-[10px] rounded-[8px]">
                                    <p className="text-[10px] font-light">Please, ensure that the customer or recipent's details are correct to avoid any potential issue with the transaction</p>
                                </span>
                                <div className="flex justify-between">
                                    <button className="w-[50%] h-[30px] text-[14px] bg-gray-300 text-black rounded-md" onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button
                                        className="w-[50%] h-[30px] text-[14px] bg-blue-500 text-white rounded-md"
                                        onClick={handleBankDetailsSubmit}
                                        disabled={isVerifying}
                                    >
                                        {isVerifying ? "Verifying..." : "Next"}
                                    </button>
                                </div>
                                {isVerificationError && <p className="text-red-500 mt-2">Error verifying account. Please try again.</p>}
                            </div>
                        )}

                        {modalStep === 2 && verifiedAccountDetails && (
                            <div className="dark:text-black">
                                <h2 className="text-xl font-semibold mb-4 dark:text-black">Enter Withdraw Amount</h2>
                                <p className="mb-4">Account Name: {verifiedAccountDetails.details.account_name}</p>
                                <p className="mb-4">Account Number: {verifiedAccountDetails.details.account_number}</p>
                                <p className="mb-4">Merchant Name: {verifiedAccountDetails.name}</p>

                                <p className="mb-4">Your withdrawable balance is NGN {balance}.00</p>
                                <input
                                    type="number"
                                    placeholder="Amount to Withdraw"
                                    className="border p-2 mb-4 w-full outline-none"
                                    value={amount}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                />
                                <div className="flex justify-between">
                                    <button
                                        className="px-4 py-2 bg-gray-300 text-black rounded-md"
                                        onClick={() => setModalStep(1)}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                                        onClick={handleWithdrawSubmit}
                                        disabled={isWithdrawing}
                                    >
                                        {isWithdrawing ? "Processing..." : "Submit"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transaction;
