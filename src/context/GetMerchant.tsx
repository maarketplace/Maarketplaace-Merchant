// MerchantContext.tsx
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getMerchant } from '../api/query';
import { IErrorResponse } from '../interface/ErrorInterface';

interface MerchantContextType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        onError: (error: IErrorResponse) =>{
            setErr(error?.response?.data?.message)
        }
    });

    useEffect(()=>{
        setMerchant(data?.data?.data?.data)
    }, [data,merchant ])
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

// eslint-disable-next-line react-refresh/only-export-components
export const useMerchant = (): MerchantContextType => {
    const context = useContext(MerchantContext);
    if (!context) {
        throw new Error('useMerchant must be used within a MerchantProvider');
    }
    return context;
};
