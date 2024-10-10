import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { getMerchantCustomer } from "../../../../../api/query";
import Table from "../../../../../utils/Table";
import { ICustomer } from "../../../../../interface/CustomerInterface";


const Customer = () => {
    const [allCustomer, setAllCustomer] = useState<ICustomer[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>("All");


    const { data, isLoading, isError } = useQuery(['getMerchantCustomer'], getMerchantCustomer, {});

    useEffect(() => {
        if (data?.data?.data) {
            const reversedData = data?.data?.data?.reverse();
            setAllCustomer(reversedData);
        }
    }, [data]);

    if (isError) {
        return <p>An error occurred while fetching the data.</p>;
    }
    const columns: Array<keyof typeof formattedData[0]> = [
        "Full Name",
        "Email",
        "Phone Number",
        // "State",
        "Date",
    ];

    const formattedData = allCustomer.map(i => ({
        "Full Name": i?.fullName || "N/A",
        "Email": i?.email,
        "Phone Number": i?.phoneNumber,
        // "Country": i?.country || "Nigeria",
        // "State": i?.state || 'Lagos',
        // "Status": i.status,
        "Date": new Date(i?.createdAt).toLocaleDateString(),
        "id": i._id
    }));

    // const filteredOrders = formattedData.filter(order => {
    //     if (statusFilter === "All") {
    //         return true;
    //     }
    //     return order.Status === statusFilter;
    // });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const handleRowClick = async (row: any,) => {
    //     setSelectedOrder(row); 
    // };

    return (
        <div className="w-[95%] ml-[35px] max-[650px]:w-[100%] flex items-center justify-center mt-[50px] max-[650px]:mt-[40px]">
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
                    data={formattedData}
                    columns={columns}
                    // onRowClick={(row) => handleRowClick(row)}
                    loading={isLoading}
                />
            </div>
        </div>
    );
};

export default Customer;
