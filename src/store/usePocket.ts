/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosInstance from "../utils/axios";

interface IPocketStore {
  pockets: IPocket[];
  loading: boolean;
  fetchData: () => Promise<any>;
}

export interface IPocket {
  collectionId: string;
  collectionName: string;
  created: string;
  deleted: boolean;
  id: string;
  limit: number;
  name: string;
  icon: string;
  color: string;
  updated: string;
  workspace_id: string;
}

const usePocketStore = create<IPocketStore>((set, get) => ({
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
