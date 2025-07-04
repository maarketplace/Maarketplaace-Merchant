/* eslint-disable @typescript-eslint/no-explicit-any */
export type ServiceType = 'event' | 'ebook' | 'course';
export type TabType = 'overview' | 'attendees' | 'verifier' | 'students' | 'readers' | 'reviews' | 'customers';

export interface ServiceConfig {
    type: ServiceType;
    title: string;
    backPath: string;
    queryKey: string;
    queryFn: (id: string) => Promise<any>;
    tabs: Array<{
        id: TabType;
        label: string;
        icon: JSX.Element;
        condition?: (data: any) => boolean;
    }>;
    actionButton?: {
        label: string;
        icon: JSX.Element;
        onClick: () => void;
    };
    statsCards: Array<{
        title: string;
        key: string;
        icon: JSX.Element;
        color: string;
        formatter?: (value: any) => string;
    }>;
    detailFields: Array<{
        label: string;
        key: string;
        formatter?: (value: any) => string;
    }>;
    mainImageAlt: string;
    statusField?: {
        key: string;
        getColor: (value: any) => string;
        getLabel: (value: any) => string;
    };
}

export interface DetailsPageProps {
    config: ServiceConfig;
}

export interface Customer {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}
export interface Attendees {
    _id: string;
    eventId: string;
    ownerName: string;
    price: number;
    issuedDate: string;
    isUsed: boolean;
    usedDate: string;
    verifiedBy: string;
}