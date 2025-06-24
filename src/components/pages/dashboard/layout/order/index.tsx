/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { getMerchantOrders } from "../../../../../api/query";
import Table from "../../../../../utils/Table";
import { IProduct } from "../../../../../interface/ProductInterface";
import { IOrder } from "../../../../../interface/OrderInterface";
import { capitalizeFirstLetter, formatNumber } from "../../../../../utils/Utils";

interface Order {
    payable_amount: number;
    status: string;
    createdAt: string | number | Date;
    products: IProduct[];
    id: string;
}

const Order = () => {
    const [allOrder, setAllOrder] = useState<IOrder[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const { data, isLoading, isError } = useQuery(['getUserOrders'], getMerchantOrders, {});

    useEffect(() => {
        if (data?.data?.data) {
            const reversedData = data?.data?.data;
            setAllOrder(reversedData);
        }
    }, [data, selectedOrder]);

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-red-600 text-lg font-medium">An error occurred while fetching the data.</p>
                    <p className="text-gray-500 text-sm mt-2">Please try refreshing the page.</p>
                </div>
            </div>
        );
    }

    type TableColumnKey = "productImage" | "name" | "email" | "phoneNumber" | "amount" | "payableAmount" | "status" | "date" | "id" | "originalData";
    interface TableColumn {
        key: TableColumnKey;
        label: string;
        sortable?: boolean;
        type?: "number" | "text" | "image" | "date";
        width?: string;
        render?: (value: any, row: any) => React.ReactNode;
    }
    const columns: TableColumn[] = [
        {
            key: "productImage",
            label: "Product",
            type: "image",
            width: "80px"
        },
        {
            key: "name",
            label: "Customer Name",
            type: "text",
            sortable: true
        },
        {
            key: "email",
            label: "Email",
            type: "text",
            sortable: true
        },
        {
            key: "phoneNumber",
            label: "Phone",
            type: "text",
            sortable: true
        },
        {
            key: "amount",
            label: "Amount",
            type: "number",
            sortable: true,
            render: (value: string) => (
                <span className="font-semibold">₦{value}</span>
            )
        },
        {
            key: "payableAmount",
            label: "Payable Amount",
            type: "number",
            sortable: true,
            render: (value: string) => (
                <span className="font-semibold text-green-600">₦{value}</span>
            )
        },
        {
            key: "status",
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
            key: "date",
            label: "Order Date",
            type: "date",
            sortable: true
        }
    ];

    const formattedData = allOrder.map(transaction => ({
        productImage: transaction?.products[0]?.productImage || null,
        name: transaction?.user_id?.fullName || "N/A",
        phoneNumber: transaction?.user_id?.phoneNumber || "N/A",
        email: transaction?.user_id?.email || "N/A",
        amount: formatNumber(transaction?.amount) || "0",
        payableAmount: formatNumber(transaction?.payable_amount) || "0",
        status: capitalizeFirstLetter(transaction.status),
        date: transaction?.createdAt ? new Date(transaction.createdAt).toISOString() : new Date().toISOString(),
        id: transaction._id,
        originalData: transaction
    }));

    const filteredOrders = formattedData.filter(order => {
        if (statusFilter === "All") {
            return true;
        }
        return order.status === statusFilter;
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRowClick = async (row: any) => {
        setSelectedOrder(row);
    };

    const getStatusOptions = () => {
        const statuses = ["All", "Pending", "Processing", "Completed", "Canceled"];
        return statuses;
    };

    return (
        <div className="p-8 max-[650px]:p-0 max-w-7xl mx-auto mt-5 ">
            <div className="mb-6">
                <h1 className="text-3xl text-[#FFC300] mb-4">Orders Management</h1>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-2">
                        <label htmlFor="status-filter" className="text-sm font-medium text-gray-700 dark:text-white">
                            Filter by Status:
                        </label>
                        <select
                            id="status-filter"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white text-gray-900"
                        >
                            {getStatusOptions().map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <Table
                columns={columns}
                data={filteredOrders}
                loading={isLoading}
                onRowClick={handleRowClick}
                rowsPerPage={5}
                searchPlaceholder="Search orders by customer name, email, or phone..."
                emptyMessage="No orders found matching your criteria"
                className="shadow-lg"
            />
        </div>
    );
};

export default Order;