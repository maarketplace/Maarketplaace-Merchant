import React, { createContext, useContext, ReactNode } from 'react';
import { QueryObserverResult, useQuery } from 'react-query';
import { getMerchant } from '../api/query';
import { IErrorResponse } from '../interface/ErrorInterface';

interface MerchantContextType {
    data: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    isLoading: boolean;
    err: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchMerchant: () => Promise<QueryObserverResult<any, unknown>>;
}


const MerchantContext = createContext<MerchantContextType | undefined>(undefined);

export const MerchantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const {
        data,
        isLoading,
        error,
        refetch: fetchMerchant,
    } = useQuery(["getMerchant"], getMerchant, { enabled: false });

    const err = (error as IErrorResponse)?.response?.data?.message || '';

    const value: MerchantContextType = {
        data: data?.data?.data,
        isLoading,
        err,
        fetchMerchant,
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
