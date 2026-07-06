import { Hanko } from "@teamhanko/hanko-elements";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BDT_API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL || "";
    // Hanko elements only work in the browser
    if (typeof window !== "undefined") {
      const hanko = new Hanko(hankoApi);
      const token = hanko.getSessionToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const apiFetcher = (url: string) =>
  apiClient.get(url).then((response) => response.data);
