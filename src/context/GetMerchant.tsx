// MerchantContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery } from 'react-query';
import { getMerchant } from '../api/query';

interface MerchantContextType {
    data: any;
    isLoading: boolean;
    error: any;
}

const MerchantContext = createContext<MerchantContextType | undefined>(undefined);

export const MerchantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const {
        data,
        isLoading,
        error,
    } = useQuery(["getMerchant"], getMerchant, {});
    const value: MerchantContextType = {
        data: data?.data?.data?.data,
        isLoading,
        error,
    };

    return (
        <MerchantContext.Provider value={value}>
            {children}
        </MerchantContext.Provider>
    );
};

export const useMerchant = (): MerchantContextType => {
    const context = useContext(MerchantContext);
    if (!context) {
        throw new Error('useMerchant must be used within a MerchantProvider');
    }
    return context;
};
