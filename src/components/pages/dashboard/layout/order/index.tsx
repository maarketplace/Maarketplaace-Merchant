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
        return <p>An error occurred while fetching the data.</p>;
    }

    const columns: Array<keyof typeof formattedData[0]> = [
        "Product Image",
        "Amount",
        "Payment Amount",
        "Name",
        "Phone Number",
        "Email",
        "Status",
        "Date",
    ];

    const formattedData = allOrder.map(transaction => ({
        "Product Image": transaction?.products[0]?.productImage || "No image available",
        "Name": transaction?.user_id?.fullName,
        "Phone Number": transaction?.user_id?.phoneNumber,
        "Email": transaction?.user_id?.email,
        "Amount": formatNumber(transaction?.amount) || "N/A",
        "Payment Amount": formatNumber(transaction?.payable_amount),
        "Status": capitalizeFirstLetter(transaction.status),
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
    const handleRowClick = async (row: any) => {
        setSelectedOrder(row);
    };
    console.log(formattedData);
    return (
        <div className="w-[95%] max-[650px]:w-[100%] flex items-center justify-center mt-[50px] overflow-scroll">
            <div className="w-[100%] mb-[50px] flex flex-col gap-[20px]">
                <div className="flex justify-between items-center mb-4">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-[10px] py-2 border rounded text-black outline-none"
                    >
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>

                <Table
                    data={filteredOrders}
                    columns={columns}
                    onRowClick={(row) => handleRowClick(row)}
                    loading={isLoading}
                    rowsPerPage={5}
                    imageColumns={['Product Image']}
                />
                {/* <img src={formattedData[0]["Product Image"]} alt="Product Image" /> */}
            </div>
        </div>
    );
};

export default Order;
