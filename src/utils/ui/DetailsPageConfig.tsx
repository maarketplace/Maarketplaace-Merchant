import {
    TbTicket,
    TbCurrencyNaira,
    TbUsers,
    TbPlus,
    TbEye,
    TbUserCheck,
    TbChartBar,
    TbDownload
} from "react-icons/tb";
import { getEbookById, getTicketsById, getCourseById } from "../../api/query";

export const eventDetailsConfig = {
    type: 'event' as const,
    title: 'Event',
    backPath: '/dashboard/ticket',
    queryKey: 'eventTicketsDDetails',
    queryFn: getTicketsById,
    mainImageAlt: 'Event banner',
    tabs: [
        { id: 'overview' as const, label: 'Overview', icon: <TbEye className="w-4 h-4" /> },
        { id: 'attendees' as const, label: 'Attendees', icon: <TbUsers className="w-4 h-4" /> },
        { id: 'verifier' as const, label: 'Verifier', icon: <TbUserCheck className="w-4 h-4" /> },
    ],
    actionButton: {
        label: 'Invite Verifier',
        icon: <TbPlus className="w-4 h-4" />,
        onClick: () => console.log('Invite verifier clicked')
    },
    statsCards: [
        {
            title: 'Tickets Sold',
            key: 'ticketsSold',
            icon: <TbTicket className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            color: 'bg-blue-100 dark:bg-blue-900',
            formatter: (value: number) => value.toString()
        },
        {
            title: 'Total Revenue',
            key: 'revenue',
            icon: <TbCurrencyNaira className="w-6 h-6 text-green-600 dark:text-green-400" />,
            color: 'bg-green-100 dark:bg-green-900',
            formatter: (value: string) => `₦${value || '0.00'}`
        },
        {
            title: 'Average Price',
            key: 'avgPrice',
            icon: <TbChartBar className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
            color: 'bg-purple-100 dark:bg-purple-900',
            formatter: (value: number) => `₦${value?.toLocaleString() || '0'}`
        }
    ],
    detailFields: [
        { label: 'Start Date', key: 'startDate' },
        { label: 'End Date', key: 'endDate' },
        { label: 'Location', key: 'location' },
        { label: 'Category', key: 'category' },
        { label: 'Event Type', key: 'eventType', formatter: (value: string) => value.charAt(0).toUpperCase() + value.slice(1) }
    ],
    statusField: {
        key: 'eventType',
        getColor: (value: string) => value === 'public'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        getLabel: (value: string) => `${value.charAt(0).toUpperCase() + value.slice(1)} Event`
    }
};

export const eBookDetailsConfig = {
    type: 'ebook' as const,
    title: 'E-Book',
    backPath: '/dashboard/ebook/create',
    queryKey: 'eBookDetails',
    queryFn: getEbookById,
    mainImageAlt: 'Ebook banner',
    tabs: [
        { id: 'overview' as const, label: 'Overview', icon: <TbEye className="w-4 h-4" /> },
        { id: 'customers' as const, label: 'Customers', icon: <TbUsers className="w-4 h-4" /> },
    ],
    statsCards: [
        {
            title: 'e-Books Sold',
            key: 'eBooksSold',
            icon: <TbDownload className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            color: 'bg-blue-100 dark:bg-blue-900',
            formatter: (value: number) => value.toString()
        },
        {
            title: 'Total Revenue',
            key: 'revenue',
            icon: <TbCurrencyNaira className="w-6 h-6 text-green-600 dark:text-green-400" />,
            color: 'bg-green-100 dark:bg-green-900',
            formatter: (value: string) => `₦${value || '0.00'}`
        },
        {
            title: 'Average Price',
            key: 'avgPrice',
            icon: <TbChartBar className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
            color: 'bg-purple-100 dark:bg-purple-900',
            formatter: (value: number) => `₦${value?.toLocaleString() || '0'}`
        }
    ],
    detailFields: [
        {
            label: 'Product Name',
            key: 'productName'
        },
        {
            label: 'Product Price',
            key: 'productPrice',
            formatter: (value: number) => `₦${value?.toLocaleString() || '0'}`
        },
        {
            label: 'Quantity',
            key: 'quantity'
        },
        {
            label: 'Category',
            key: 'category'
        },
        {
            label: 'Sub Category',
            key: 'subCategory'
        }
    ],
};

export const courseDetailsConfig = {
    type: 'course' as const,
    title: 'Course',
    backPath: '/dashboard/course/create',
    queryKey: 'courseDetails',
    queryFn: getCourseById,
    mainImageAlt: 'Course banner',
    tabs: [
        { id: 'overview' as const, label: 'Overview', icon: <TbEye className="w-4 h-4" /> },
        { id: 'customers' as const, label: 'Customers', icon: <TbUsers className="w-4 h-4" /> },
    ],
    statsCards: [
        {
            title: 'Course Sold',
            key: 'coursesSold',
            icon: <TbDownload className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            color: 'bg-blue-100 dark:bg-blue-900',
            formatter: (value: number) => value.toString()
        },
        {
            title: 'Total Revenue',
            key: 'revenue',
            icon: <TbCurrencyNaira className="w-6 h-6 text-green-600 dark:text-green-400" />,
            color: 'bg-green-100 dark:bg-green-900',
            formatter: (value: string) => `₦${value || '0.00'}`
        },
        {
            title: 'Average Price',
            key: 'avgPrice',
            icon: <TbChartBar className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
            color: 'bg-purple-100 dark:bg-purple-900',
            formatter: (value: number) => `₦${value?.toLocaleString() || '0'}`
        }
    ],
    detailFields: [
        {
            label: 'Product Name',
            key: 'productName'
        },
        {
            label: 'Product Price',
            key: 'productPrice',
            formatter: (value: number) => `₦${value?.toLocaleString() || '0'}`
        },
        {
            label: 'Quantity',
            key: 'quantity'
        },
        {
            label: 'Category',
            key: 'category'
        },
        {
            label: 'Sub Category',
            key: 'subCategory'
        }
    ],
};
