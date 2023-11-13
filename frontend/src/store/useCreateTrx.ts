/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosInstance from "../utils/axios";

interface ICreateTrxStore {
  trx: any;
  loading: boolean;
  createTrx: (data: any) => Promise<any>;
}

const useCreateTrxStore = create<ICreateTrxStore>((set, get) => ({
  trx: [],
  loading: false,
  createTrx: async (payload: any) => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const { data } = await axiosInstance().post(`/transactions`, {
        ...payload,
        amount: parseInt(payload.amount),
      });
      set({
        loading: false,
        trx: data?.data,
      });
      return data?.data;
    } catch (error) {
      set({ loading: false });
    }
  },
}));

export default useCreateTrxStore;
