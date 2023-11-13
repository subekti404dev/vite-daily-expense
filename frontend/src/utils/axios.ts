import { createStandaloneToast } from "@chakra-ui/react";
import Axios from "axios";
import { authToken } from "./token";

const toast = createStandaloneToast();
const axiosInstance = (token?: string) => {
  const reqToken = token || authToken.getToken();
  const axios = Axios.create({
    baseURL: `${import.meta.env.VITE_API_HOST || ""}/v1`,
    headers: {
      ...(!!reqToken && {
        Authorization: `Bearer ${reqToken}`,
      }),
    },
  });
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      let errMsg = err?.response?.data?.message;
      if (!errMsg && err?.response?.data) {
        try {
          errMsg = JSON.stringify(err?.response?.data);
        } catch (error) {
          console.log(error);
        }
      }
      if (!errMsg) errMsg = err.message;
      toast.toast({ title: errMsg, status: "error" });
      return Promise.reject(err);
    }
  );
  return axios;
};

export default axiosInstance;
