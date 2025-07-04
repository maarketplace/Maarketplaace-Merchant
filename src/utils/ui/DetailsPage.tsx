/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import {
    TbArrowLeft,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Loading from "../../loader";
import InviteAgentModal from "../../components/pages/dashboard/layout/Upload/ticket/InviteAgent";
import { getEbookCustomers, getEventsAttendees } from "../../api/query";
import Table from "../Table";
import { DetailsPageProps, ServiceType, TabType } from "../../interface/DetailsConfigInterface";
import { customerTableColumns, attendeeTableColumns } from "./TableColumns";




const normalizeApiData = (data: any, serviceType: ServiceType) => {
    if (!data) return { item: null, stats: null };

    let item = null;
    let stats = null;
    let verifiers = null;

    if (serviceType === 'ebook') {
        const productData = data?.data?.data?.product;
        if (productData) {
            item = {
                _id: productData.id,
                name: productData.productName,
                description: productData.description || 'No description available',
                bannerImage: productData.productImage,
                category: productData.category,
                price: `₦${productData.productPrice?.toLocaleString()}`,
                productName: productData.productName,
                productPrice: productData.productPrice,
                quantity: productData.quantity,
                subCategory: productData.subCategory,
            };
        }

        const apiData = data?.data?.data;
        if (apiData) {
            stats = {
                revenue: apiData.revenue?.toString() || '0',
                avgPrice: apiData.averagePrice || 0,
                eBooksSold: apiData.totalPurchase || 0,
                totalDownloads: apiData.totalPurchase || 0,
                totalReviews: 0,
            };
        }
    } else if (serviceType === 'event') {
        const eventData = data?.data?.data?.data?.event;
        if (eventData) {
            item = {
                _id: eventData._id,
                name: eventData.name,
                description: eventData.description,
                bannerImage: eventData.bannerImage,
                category: eventData.category,
                price: eventData.price,
                startDate: eventData.startDate,
                endDate: eventData.endDate,
                location: eventData.location,
                eventType: eventData.eventType,
                totalTickets: eventData.totalTickets,
                ticketsSold: eventData.ticketsSold,
                remainingTickets: eventData.remainingTickets,
            };
        }

        stats = data?.data?.data?.data?.stats;
        verifiers = data?.data?.data?.data?.verifiers || [];
    }

    return { item, stats, verifiers };
};

const DetailsPage: React.FC<DetailsPageProps> = ({ config }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [showModal, setShowModal] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: [config.queryKey, id],
        queryFn: () => config.queryFn(String(id)),
        onSuccess: () => {
        },
        onError: (error: { message: string }) => {
            toast.error(error?.message || 'Failed to load data');
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
    });

    const { data: customersData, isLoading: customersLoading } = useQuery({
        queryKey: ['customers', id, activeTab],
        queryFn: () => getEbookCustomers(String(id)),
        enabled: (activeTab === 'customers') && !!id,
        onError: (error: { message: string }) => {
            toast.error(error?.message || 'Failed to load customers data');
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
    });

    const { data: attendeesData, isLoading: attendeesLoading } = useQuery({
        queryKey: ['attendees', id],
        queryFn: () => getEventsAttendees(String(id)),
        enabled: activeTab === 'attendees' && !!id,
        onError: (error: { message: string }) => {
            toast.error(error?.message || 'Failed to load attendees data');
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
    });

    const { item, stats, verifiers } = normalizeApiData(data, config.type);

    const availableTabs = config.tabs.filter(tab =>
        !tab.condition || tab.condition(item)
    );

    const handleActionClick = () => {
        if (config.actionButton?.onClick) {
            config.actionButton.onClick();
        }
        setShowModal(true);
    };



    const renderCustomersTable = () => {
        if ((activeTab === 'customers' && customersLoading) ||
            (activeTab === 'attendees' && attendeesLoading)) {
            return (
                <div className="flex justify-center items-center py-12">
                    <Loading width="50px" />
                </div>
            );
        }

        const customers = customersData?.data?.data?.customers || [];
        const attendees = attendeesData?.data?.data?.data?.attendees || [];

        const isCustomersTab = activeTab === 'customers';
        const currentData = isCustomersTab ? customers : attendees;
        const currentColumns = isCustomersTab ? customerTableColumns : attendeeTableColumns;
        const tabLabel = isCustomersTab ? 'Customers' : 'Attendees';

        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {tabLabel} ({currentData.length})
                    </h3>
                    {((isCustomersTab && customersData?.data?.data?.totalItems) ||
                        (!isCustomersTab && attendeesData?.data?.data?.totalItems)) && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Total: {isCustomersTab ?
                                    customersData?.data.data.totalItems :
                                    attendeesData?.data.data.totalItems}
                            </span>
                        )}
                </div>

                <Table
                    columns={currentColumns}
                    data={currentData}
                    loading={isCustomersTab ? customersLoading : attendeesLoading}
                    emptyMessage={`No ${tabLabel.toLowerCase()} found`}
                    searchPlaceholder={`Search ${tabLabel.toLowerCase()}...`}
                    showSearch={true}
                    striped={true}
                    rowsPerPage={10}
                />
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-[100%] p-4 md:p-6 scrollbar-hide overflow-hidden flex justify-center items-center">
                <Loading width="150px" />
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-[100%] p-4 md:p-6 scrollbar-hide overflow-hidden">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                        {config.title} not found
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        The {config.title.toLowerCase()} you're looking for doesn't exist or has been removed.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mt-4 px-6 py-2 bg-[#FFC300] hover:bg-yellow-500 text-black font-medium rounded-lg transition-colors duration-200"
                    >
                        Go Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const renderDetailField = (field: any, value: any) => {
        if (field.formatter) {
            return field.formatter(value);
        }
        return value?.toString() || 'N/A';
    };

    const renderStatsCard = (stat: any, value: any) => {
        const formattedValue = stat.formatter ? stat.formatter(value) : value;
        return (
            <div className="bg-white dark:bg-black border dark:border-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {stat.title}
                        </h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {formattedValue}
                        </p>
                    </div>
                    <div className={`p-3 ${stat.color} rounded-full`}>
                        {stat.icon}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-[100%] p-4 md:p-8 scrollbar-hide overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 max-[650px]:mt-8">
                <div className="flex items-center gap-4 ">
                    <button
                        onClick={() => navigate(config.backPath)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                        <TbArrowLeft className="w-5 h-5" />
                        Back to {config.title}s
                    </button>
                </div>
                {config.actionButton && (
                    <button
                        onClick={handleActionClick}
                        className="flex items-center gap-2 bg-[#FFC300] hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        {config.actionButton.icon}
                        {config.actionButton.label}
                    </button>
                )}
            </div>

            {/* Main Info Card */}
            <div className="bg-white dark:bg-black border dark:border-gray-800 rounded-lg shadow-sm mb-6 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 lg:w-2/5">
                        <div className="h-48 md:h-[400px] min-h-[300px] overflow-hidden">
                            <img
                                src={item.bannerImage}
                                alt={config.mainImageAlt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex-1 p-6">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    {item.name}
                                </h1>

                                <div className="space-y-3 mb-6">
                                    {config.detailFields.map((field, index) => {
                                        const value = (item as any)[field.key];
                                        if (!value) return null;

                                        return (
                                            <div key={index} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                                <span className="font-medium">{field.label}:</span>
                                                <span>{renderDetailField(field, value)}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-[#FFC300]">
                                            {item.price}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Price
                                        </div>
                                    </div>
                                </div>

                                {config.statusField && (
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.statusField.getColor((item as any)[config.statusField.key])}`}>
                                            {config.statusField.getLabel((item as any)[config.statusField.key])}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {config.statsCards.map((stat, index) => {
                    const value = (stats as any)?.[stat.key] || 0;
                    return (
                        <div key={index}>
                            {renderStatsCard(stat, value)}
                        </div>
                    );
                })}
            </div>

            {/* Tabs Section */}
            <div className="bg-white dark:bg-black rounded-lg shadow-sm">
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex space-x-8 px-6">
                        {availableTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                    ? 'border-[#FFC300] text-[#FFC300]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="pt-4">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                    {config.title} Description
                                </h3>
                                <div
                                    className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400"
                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        {config.title} Details
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        {config.detailFields.map((field, index) => {
                                            const value = (item as any)[field.key];
                                            if (!value) return null;

                                            return (
                                                <div key={index} className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">{field.label}:</span>
                                                    <span className="text-gray-900 dark:text-white">
                                                        {renderDetailField(field, value)}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        Statistics
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        {config.statsCards.map((stat, index) => {
                                            const value = (stats as any)?.[stat.key];
                                            if (value === undefined || value === null) return null;

                                            return (
                                                <div key={index} className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">{stat.title}:</span>
                                                    <span className="text-gray-900 dark:text-white">
                                                        {stat.formatter ? stat.formatter(value) : value}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {(activeTab === 'customers' || activeTab === 'attendees') && (
                        renderCustomersTable()
                    )}
                    {
                        activeTab === 'verifier' && (
                            <div className="text-center py-12">
                               <Table 
                               data={verifiers || []}
                                 columns={[
                                    {
                                        key: 'name',
                                        label: 'Verifier Name',
                                        sortable: true,
                                        type: 'text',
                                        priority: 1,
                                    },
                                    {
                                        key: 'email',
                                        label: 'Email',
                                        sortable: true,
                                        type: 'text',
                                        priority: 2,
                                    }
                                ]}
                                loading={false}
                                emptyMessage="No verifiers found"
                                searchPlaceholder="Search verifiers..."
                                showSearch={true}
                                striped={true}
                                rowsPerPage={10}
                               />
                            </div>
                        )
                    }

                    {activeTab !== 'overview' && activeTab !== 'customers' && activeTab !== 'attendees' && activeTab !== 'verifier' && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 text-gray-400 mx-auto mb-4">
                                {availableTabs.find(tab => tab.id === activeTab)?.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {availableTabs.find(tab => tab.id === activeTab)?.label}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {activeTab} functionality coming soon...
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <InviteAgentModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
};

export default DetailsPage;
