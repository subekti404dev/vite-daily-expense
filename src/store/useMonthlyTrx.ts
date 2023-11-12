/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { fixTrxDateFromArray } from "../utils/date";
import { ITrx } from "./useHistoryTrx";

interface IMonthlyTrxStore {
  trx: ITrx[];
  loading: boolean;
  fetchData: () => Promise<any>;
}

const useMonthlyTrxStore = create<IMonthlyTrxStore>((set, get) => ({
  trx: [],
  loading: false,
  fetchData: async () => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const currMonth = new Date().getMonth() + 1;
      const currYear = new Date().getFullYear();
      const { data } = await axiosInstance().get(
        `/transactions/month/${currYear}-${currMonth}`
      );
      set({
        loading: false,
        trx: fixTrxDateFromArray(data?.data || []),
      });
    } catch (error) {
      set({ loading: false });
    }
  },
}));

export default useMonthlyTrxStore;
