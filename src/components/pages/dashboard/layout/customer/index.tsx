import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { getMerchantCustomer } from "../../../../../api/query";
import Table from "../../../../../utils/Table";
import { ICustomer } from "../../../../../interface/CustomerInterface";


const Customer = () => {
    const [allCustomer, setAllCustomer] = useState<ICustomer[]>([]);


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
    const columns: { key: "Full Name" | "Email" | "Phone Number" | "Date" | "id"; label: string }[] = [
        { key: "Full Name", label: "Full Name" },
        { key: "Email", label: "Email" },
        { key: "Phone Number", label: "Phone Number" },
        { key: "Date", label: "Date" },
    ];

    const formattedData = allCustomer.map(i => ({
        "Full Name": i?.fullName || "N/A",
        "Email": i?.email,
        "Phone Number": i?.phoneNumber,
        "Date": new Date(i?.createdAt).toLocaleDateString(),
        "id": i._id
    }));


    return (
        <div className="w-[100%] max-[650px]:w-[100%] flex items-center justify-center mt-[50px] max-[650px]:mt-[40px]">
            <div className="w-[95%] mb-[50px] flex flex-col gap-[20px]">
                <h1 className="text-2xl font-semibold text-black dark:text-white p-0 m-0">Customers Management</h1>
                <p className="mb-4 text-sm">You will be able to view all your customers here </p>
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
