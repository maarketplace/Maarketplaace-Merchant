/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation } from "react-query";
import { useEffect, useState } from "react";
import { fetchBanks, getMerchantBalance, getTransaction } from "../../../../../api/query";
import { verifyMerchantAccountNumber, withdrawFunds } from "../../../../../api/mutation";
import { capitalizeFirstLetter, formatNumber } from "../../../../../utils/Utils";
import { IAccountDetails, IBanks } from "../../../../../interface/AccountDetails";
import { IErrorResponse } from "../../../../../interface/ErrorInterface";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ITransactionHistory } from "../../../../../interface/TransactionHistoryInterface";
import Table from "../../../../../utils/Table";

type TableColumnKey = "id" | "Account Name" | "Payment Gateway" | "Withdrawal Amount" | "Transaction Type" | "Fee" | "Status" | "Date";
interface TableColumn {
    key: TableColumnKey;
    label: string;
    sortable?: boolean;
    type?: "number" | "text" | "image" | "date";
    width?: string;
    render?: (value: any, row: any) => React.ReactNode;
}
const Withdrawal = () => {
    const navigate = useNavigate()
    const [allTransaction, setAllTransaction] = useState<ITransactionHistory[]>([]);
    const [balance, setBalance] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const [bankDetails, setBankDetails] = useState({ bankName: '', accountNumber: '', bankCode: '' });
    const [amount, setWithdrawAmount] = useState<string | undefined>();
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [verifiedAccountDetails, setVerifiedAccountDetails] = useState<IAccountDetails | null>(null);
    const [error, setError] = useState('')

    const { data: balanceData } = useQuery(['getMerchantBalance'], getMerchantBalance, {
        onError: (err: IErrorResponse) => {
            if (err.response.data.message == "Token expired login again") {
                localStorage.clear();
                navigate('/')
            }
        }
    });

    const { data: transactionData, isLoading } = useQuery(['getTransaction'], getTransaction, {
        onError: (err: IErrorResponse) => {
            if (err.response.data.message == "Token expired login again") {
                localStorage.clear();
                navigate('/')
            }
        }
    });

    const { data: banksData, isLoading: isBanksLoading } = useQuery('fetchBanks', fetchBanks);

    const { mutate: verifyAccount, isLoading: isVerifying, isError: isVerificationError } = useMutation(
        ['verifyMerchantAccountNumber'],
        verifyMerchantAccountNumber,
        {
            onSuccess: (data) => {
                setVerifiedAccountDetails(data?.data?.data);
                setModalStep(2);
            },
            onError: (error: IErrorResponse) => {
                setError(error?.response?.data?.message)
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
                toast.success("Withdrawal request submitted successfully.");
            },
            onError: (error: IErrorResponse) => {
                console.error("Error processing withdrawal:", error);
                toast.error(error?.response?.data?.message);
            },
        }
    );

    useEffect(() => {
        if (transactionData?.data?.data) {
            setAllTransaction(transactionData?.data?.data);
        }
    }, [transactionData]);

    useEffect(() => {
        if (balanceData?.data?.data) {
            setBalance(balanceData?.data?.data?.data?.balance);
        }
    }, [balanceData]);

    const openModal = () => {
        setIsModalOpen(true);
        setModalStep(1);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalStep(1);
    };

    const handleBankDetailsSubmit = () => {
        if (bankDetails.bankName && bankDetails.accountNumber && bankDetails.bankCode) {
            verifyAccount({
                account_number: bankDetails.accountNumber,
                bank_code: bankDetails.bankCode,
            });
        } else {
            toast.error("Please fill in all the bank details.");
        }
    };

    const handleWithdrawSubmit = () => {
        if (amount && verifiedAccountDetails) {
            const amountAsNumber = Number(amount);
            if (isNaN(amountAsNumber)) {
                toast.error("Please enter a valid number for the withdrawal amount.");
                return;
            }
            submitWithdrawal({
                amount: amountAsNumber,
                id: verifiedAccountDetails._id,
            });
        } else {
            toast.error("Please enter an amount to withdraw.");
        }
    };

    const columns: TableColumn[] = [
        {
            key: "Account Name",
            label: "Account Name"
        },
        {
            key: "Payment Gateway",
            label: "Payment Gateway"
        },
        {
            key: "Withdrawal Amount",
            label: "Withdrawal Amount"
        },
        {
            key: "Transaction Type",
            label: "Transaction Type"
        },
        {
            key: "Fee",
            label: "Fee"
        },
        {
            key: "Status",
            label: "Status",
            type: "text",
            sortable: true,
            render: (value: string) => {
                const getStatusColor = (status: string) => {
                    switch (status.toLowerCase()) {
                        case 'completed':
                            return 'bg-green-100 text-green-800';
                        case 'pending':
                            return 'bg-yellow-100 text-yellow-800';
                        case 'processing':
                            return 'bg-blue-100 text-blue-800';
                        case 'canceled':
                            return 'bg-red-100 text-red-800';
                        default:
                            return 'bg-gray-100 text-gray-800';
                    }
                };

                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
                        {value}
                    </span>
                );
            }
        },
        {
            key: "Date",
            label: "Date",
        }
    ];

    const formattedData = allTransaction?.map(transaction => ({
        "Account Name": transaction?.details?.account_name,
        "Payment Gateway": transaction?.details?.gateway,
        "Withdrawal Amount": formatNumber(transaction?.amount) || "N/A",
        "Transaction Type": capitalizeFirstLetter(transaction?.transaction_type),
        "Fee": formatNumber(transaction?.fee),
        "Status": capitalizeFirstLetter(transaction?.transaction_status),
        "Date": transaction?.createdTime,
        "id": transaction._id
    }));

    const filteredOrders = formattedData?.filter(order => {
        if (statusFilter === "All") {
            return true;
        }
        return order.Status === statusFilter;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br bg-white dark:bg-black">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="bg-white dark:bg-black rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Account Balance</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-500">Nigerian Naira (NGN)</p>
                                </div>
                            </div>
                            <div className="mb-2">
                                <p className="text-4xl font-bold text-slate-900 dark:text-white mb-1">
                                    ₦{formatNumber(balance)}.00
                                </p>
                                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                                    Available for withdrawal
                                </p>
                            </div>
                        </div>
                        <div className="lg:text-right">
                            <button
                                onClick={openModal}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                </svg>
                                Withdraw Funds
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white  rounded-2xl shadow-xl dark:bg-black overflow-hidden w-full">
                    <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                                    Transaction History
                                </h2>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Track all your withdrawal transactions
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Filter:
                                </label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                                >
                                    <option value="All">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="completed">Completed</option>
                                    <option value="canceled">Canceled</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-6">
                        <Table
                            data={filteredOrders}
                            columns={columns}
                            loading={isLoading}
                        />
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700">
                        {modalStep === 1 && (
                            <div className="p-6">
                                {/* Modal Header */}
                                <div className="text-center mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                        Withdraw to Bank
                                    </h2>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Enter your bank details to proceed with withdrawal
                                    </p>
                                </div>

                                {/* Bank Selection */}
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Select Bank
                                        </label>
                                        <input
                                            type="text"
                                            list="banks"
                                            placeholder="Choose your bank"
                                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            value={bankDetails.bankName}
                                            onChange={(e) => {
                                                const selectedBank = banksData?.data?.data.find(
                                                    (bank: { name: string }) => bank.name === e.target.value
                                                );
                                                setBankDetails({
                                                    ...bankDetails,
                                                    bankName: e.target.value,
                                                    bankCode: selectedBank?.code || '',
                                                });
                                            }}
                                        />
                                        <datalist id="banks">
                                            {!isBanksLoading &&
                                                banksData?.data?.data.map((bank: IBanks) => (
                                                    <option key={bank.code} value={bank.name} />
                                                ))}
                                        </datalist>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Account Number
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter 10-digit account number"
                                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            value={bankDetails.accountNumber}
                                            onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Warning Notice */}
                                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">
                                                Important Notice
                                            </p>
                                            <p className="text-xs text-amber-700 dark:text-amber-300">
                                                Please ensure all bank details are correct to avoid transaction issues
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Error Message */}
                                {isVerificationError && (
                                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                                        <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={closeModal}
                                        className="flex-1 px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleBankDetailsSubmit}
                                        disabled={isVerifying}
                                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isVerifying ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Verifying...
                                            </div>
                                        ) : "Verify Account"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {modalStep === 2 && verifiedAccountDetails && (
                            <div className="p-6">
                                {/* Modal Header */}
                                <div className="text-center mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                                        {verifiedAccountDetails.details.account_name}
                                    </h2>
                                    <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                                        Account verified successfully
                                    </p>
                                </div>

                                {/* Transaction Limits */}
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                                    <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
                                        Transaction Limits
                                    </h3>
                                    <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                                        <p>• Maximum: <span className="font-bold">₦5,000,000.00</span> per day</p>
                                        <p>• Minimum: <span className="font-bold">₦1,100.00</span> per transaction</p>
                                        <p>• Processing fee: <span className="font-bold">₦100.00</span></p>
                                    </div>
                                </div>

                                {/* Amount Input */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Withdrawal Amount
                                        </label>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            Fee: <span className="font-semibold text-red-600 dark:text-red-400">₦100.00</span>
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 font-medium">
                                            ₦
                                        </span>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg font-medium"
                                            value={amount}
                                            onChange={(e) => setWithdrawAmount(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setModalStep(1)}
                                        className="flex-1 px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleWithdrawSubmit}
                                        disabled={isWithdrawing}
                                        className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isWithdrawing ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </div>
                                        ) : "Complete Withdrawal"}
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

export default Withdrawal;
