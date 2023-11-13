/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { fixTrxDateFromArray } from "../utils/date";

interface IHistoryTrxStore {
  trx: ITrx[];
  loading: boolean;
  loadingDelete: boolean;
  yearMonth: string;
  fetchData: (year?: number, month?: number) => Promise<any>;
  refetchData: () => Promise<any>;
  delete: (id: string) => Promise<any>;
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
  pocket_icon: string;
  pocket_color: string;
  category_name: string;
  user_name: string;
  user_avatar: string;
}

const useHistoryTrxStore = create<IHistoryTrxStore>((set, get) => ({
  trx: [],
  loading: false,
  loadingDelete: false,
  yearMonth: "",
  fetchData: async (year?: number, month?: number) => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const currMonth = new Date().getMonth() + 1;
      const currYear = new Date().getFullYear();
      const yearMonth = `${year || currYear}-${month || currMonth}`;
      const { data } = await axiosInstance().get(
        `/transactions/month/${yearMonth}`
      );
      set({
        loading: false,
        trx: fixTrxDateFromArray(data?.data || []),
        yearMonth,
      });
      return data;
    } catch (error) {
      set({ loading: false });
    }
  },
  refetchData: async () => {
    const ym = get().yearMonth;
    const y = parseInt(ym.split("-")?.[0]);
    const m = parseInt(ym.split("-")?.[1]);
    return get().fetchData(y, m);
  },
  delete: async (id: string) => {
    try {
      if (get().loadingDelete) return;
      set({ loadingDelete: true });
      const { data } = await axiosInstance().delete(`/transactions/${id}`);
      set({
        loadingDelete: false,
      });
      return data;
    } catch (error) {
      set({ loadingDelete: false });
    }
  },
}));

export default useHistoryTrxStore;
