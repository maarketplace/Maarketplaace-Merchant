import { create } from "zustand";

interface IProductStore {
  productId: string | null;
  productName: string | null;
  setProductId: (id: string) => void;
  setProductName: (value: string) => void;
}

export const useProductStore = create<IProductStore>((set) => ({
  productId: null,
  productName: null,
  setProductId: (id) => set({ productId: id }),
  setProductName: (value) => set({ productName: value }),
}));
