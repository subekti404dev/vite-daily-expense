/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosInstance from "../utils/axios";

interface IAuthStore {
  pockets: any;
  loading: boolean;
  fetchData: () => Promise<any>;
}

const usePocketStore = create<IAuthStore>((set, get) => ({
  pockets: [],
  loading: false,
  fetchData: async () => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const { data } = await axiosInstance().get("/pockets");
      set({ loading: false, pockets: data?.data || [] });
    } catch (error) {
      set({ loading: false });
    }
  },
}));

export default usePocketStore;
