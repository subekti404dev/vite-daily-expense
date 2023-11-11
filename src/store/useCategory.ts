/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosInstance from "../utils/axios";

interface ICategoryStore {
  categories: ICategory[];
  loading: boolean;
  fetchData: () => Promise<any>;
}

export interface ICategory {
  id: string;
  name: string;
  workspace_id: string;
}

const useCategoryStore = create<ICategoryStore>((set, get) => ({
  categories: [],
  loading: false,
  fetchData: async () => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const { data } = await axiosInstance().get("/categories");
      set({ loading: false, categories: data?.data || [] });
    } catch (error) {
      set({ loading: false });
    }
  },
}));

export default useCategoryStore;
