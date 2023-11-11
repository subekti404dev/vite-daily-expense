/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { authToken } from "../utils/token";

interface IAuthStore {
  user: IUser | null;
  loading: boolean;
  loggingIn: boolean;
  login: (email: string, password: string) => Promise<any>;
  getProfile: () => Promise<any>;
  init: () => Promise<any>;
}
export interface IUser {
  collectionId: string;
  collectionName: string;
  created: string;
  deleted: boolean;
  email: string;
  hash_password: string;
  id: string;
  name: string;
  updated: string;
  workspace_id: string;
  iat: number;
}

const useAuthStore = create<IAuthStore>((set, get) => ({
  user: null,
  loading: false,
  loggingIn: false,
  login: async (email: string, password: string) => {
    try {
      set({ loggingIn: true });
      const { data } = await axiosInstance().post("/auth/login", {
        email,
        password,
      });

      if (data.token) {
        authToken.setToken(data.token);
        return get().init();
      }
      set({ loggingIn: false });
    } catch (error) {
      set({ loggingIn: false });
    }
  },
  getProfile: async () => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const { data } = await axiosInstance().get("/users/me");
      if (data.data) {
        set({ user: data.data, loading: false });
        return data.data;
      }
    } catch (error) {
      set({ loading: false });
    }
  },
  init: async () => {
    if (authToken.getToken()) {
      return get().getProfile();
    }
  },
}));

export default useAuthStore;
