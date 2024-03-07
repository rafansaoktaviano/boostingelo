import axios, { AxiosRequestConfig } from "axios";
import supabase from "../supabase/supabase";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (
    config: AxiosRequestConfig = {
      headers: {
        Accept: "application/json",
      },
    }
  ) => {
    try {
      const session = await supabase.auth.getSession();
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${session.data.session?.access_token}`;

      return config as any;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

export default axiosInstance;
