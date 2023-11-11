/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { fixTrxDateFromArray } from "../utils/date";

interface IMonthlyTrxStore {
  trx: ITrx[];
  loading: boolean;
  fetchData: () => Promise<any>;
}

export interface ITrx {
  amount: number;
  category_id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  date: string;
  deleted: boolean;
  id: string;
  name: string;
  pocket_id: string;
  updated: string;
  user_id: string;
  workspace_id: string;
  pocket_name: string;
  category_name: string;
  user_name: string;
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
