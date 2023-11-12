/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { authToken } from "../utils/token";

interface IAuthStore {
  user: IUser | null;
  partners: IUser[];
  loading: boolean;
  loadingPartner: boolean;
  loggingIn: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  getProfile: () => Promise<any>;
  getPartners: () => Promise<any>;
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
  avatar: string;
}

const useAuthStore = create<IAuthStore>((set, get) => ({
  user: null,
  partners: [],
  loading: false,
  loadingPartner: false,
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
  logout: async () => {
    set({ user: null, partners: [] });
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
  getPartners: async () => {
    try {
      if (get().loadingPartner) return;
      set({ loadingPartner: true });
      const { data } = await axiosInstance().get("/users/partners");
      if (data.data) {
        set({ partners: data.data || [], loadingPartner: false });
        return data.data;
      }
    } catch (error) {
      console.log(error);
      set({ loadingPartner: false });
    }
  },
  init: async () => {
    if (authToken.getToken()) {
      const [profile] = await Promise.all([
        get().getProfile(),
        get().getPartners(),
      ]);
      return profile;
    }
  },
}));

export default useAuthStore;
