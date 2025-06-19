import { create } from "zustand";

interface IMerchantStore {
  productId: string | null;
  productName: string | null;
  setProductId: (id: string) => void;
  setProductName: (value: string) => void;
}

export const useMerchantStore = create<IMerchantStore>((set) => ({
  productId: null,
  productName: null,
  setProductId: (id) => set({ productId: id }),
  setProductName: (value) => set({ productName: value }),
}));
