// MerchantContext.tsx
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getMerchant } from '../api/query';

interface MerchantContextType {
    data: any;
    isLoading: boolean;
    err: string
}

const MerchantContext = createContext<MerchantContextType | undefined>(undefined);

export const MerchantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [merchant, setMerchant] = useState()
    const [err, setErr] = useState('')
    const {
        data,
        isLoading,
    } = useQuery(["getMerchant"], getMerchant, {
        onError: (error: any) =>{
            setErr(error?.response?.data?.message)
        }
    });

    useEffect(()=>{
        setMerchant(data?.data?.data?.data)
    }, [data])
    const value: MerchantContextType = {
        data: merchant,
        isLoading,
        err,
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
