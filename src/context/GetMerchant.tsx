import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery } from 'react-query';
import { getMerchant } from '../api/query';
import { IErrorResponse } from '../interface/ErrorInterface';

interface MerchantContextType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    isLoading: boolean;
    err: string;
}

const MerchantContext = createContext<MerchantContextType | undefined>(undefined);

export const MerchantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const {
        data,
        isLoading,
        error
    } = useQuery(["getMerchant"], getMerchant);

    // Extract the error message if an error occurs
    const err = (error as IErrorResponse)?.response?.data?.message || '';

    const value: MerchantContextType = {
        data: data?.data?.data, // Accessing nested data directly
        isLoading,
        err,
    };

    return (
        <MerchantContext.Provider value={value}>
            {children}
        </MerchantContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMerchant = (): MerchantContextType => {
    const context = useContext(MerchantContext);
    if (!context) {
        throw new Error('useMerchant must be used within a MerchantProvider');
    }
    return context;
};
