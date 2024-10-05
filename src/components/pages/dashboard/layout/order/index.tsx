import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { getMerchantOrders } from "../../../../../api/query";
import Table from "../../../../../utils/Table";
import { IProduct } from "../../../../../interface/ProductInterface";
import { IOrder } from "../../../../../interface/OrderInterface";


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
            const reversedData = data?.data?.data?.data.reverse();
            setAllOrder(reversedData);
        }
    }, [data, selectedOrder]);

    if (isError) {
        return <p>An error occurred while fetching the data.</p>;
    }
    const columns: Array<keyof typeof formattedData[0]> = [
        "Amount",
        "Payment Amount",
        "Country",
        "State",
        "Status",
        "Date",
    ];

    const formattedData = allOrder.map(transaction => ({
        "Amount": transaction?.amount || "N/A",
        "Payment Amount": transaction?.payable_amount,
        "Country": transaction?.country || "Nigeria",
        "State": transaction?.state || 'Lagos',
        "Status": transaction.status,
        "Date": new Date(transaction?.createdAt).toLocaleDateString(),
        "id": transaction._id
    }));

    const filteredOrders = formattedData.filter(order => {
        if (statusFilter === "All") {
            return true;
        }
        return order.Status === statusFilter;
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRowClick = async (row: any,) => {
        setSelectedOrder(row); 
    };

    return (
        <div className="w-full flex items-center justify-center mt-[50px] max-[650px]:mt-[70px]">
            <div className="w-[100%] mb-[50px] flex flex-col gap-[20px]">
                <div className="flex justify-between items-center mb-4">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border rounded text-black outline-none"
                    >
                        <option value="All">All</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>

                <Table
                    data={filteredOrders}
                    columns={columns}
                    onRowClick={(row) => handleRowClick(row)}
                    loading={isLoading}
                />
            </div>
        </div>
    );
};

export default Order;