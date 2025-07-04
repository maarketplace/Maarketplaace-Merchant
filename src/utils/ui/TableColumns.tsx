import { Customer, Attendees } from "../../interface/DetailsConfigInterface";

export const customerTableColumns = [
    {
        key: 'fullName' as keyof Customer,
        label: 'Full Name',
        sortable: true,
        type: 'text' as const,
        priority: 1,
    },
    {
        key: 'email' as keyof Customer,
        label: 'Email',
        sortable: true,
        type: 'text' as const,
        priority: 2,
    },
    {
        key: 'phoneNumber' as keyof Customer,
        label: 'Phone Number',
        sortable: false,
        type: 'text' as const,
        mobileHidden: true,
    },
    {
        key: 'createdAt' as keyof Customer,
        label: 'Purchase Date',
        sortable: true,
        type: 'date' as const,
        mobileHidden: true,
        render: (value: string) => new Date(value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }),
    },
];

export const attendeeTableColumns = [
    {
        key: 'name' as keyof Attendees,
        label: 'Name',
        sortable: true,
        type: 'text' as const,
        priority: 1,
    },
    {
        key: 'ticketCode' as keyof Attendees,
        label: 'Ticket Code',
        sortable: true,
        type: 'number' as const,
        priority: 2,
        render: (value: number) => `₦${value?.toLocaleString()}`,
    },
    {
        key: 'isUsed' as keyof Attendees,
        label: 'Status',
        sortable: true,
        type: 'text' as const,
        priority: 5,
        render: (value: boolean) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${value
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}>
                {value ? 'Used' : 'Unused'}
            </span>
        ),
    },
];