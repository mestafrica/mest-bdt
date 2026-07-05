import { Hanko } from "@teamhanko/hanko-elements";
import axios from "axios";

const getBaseURL = () => {
  if (typeof window === "undefined") {
    // Server-side
    return (
      process.env.BDT_API_URL_INTERNAL || process.env.NEXT_PUBLIC_BDT_API_URL
    );
  }
  // Client-side
  return process.env.NEXT_PUBLIC_BDT_API_URL;
};

export const apiClient = axios.create({
  baseURL: getBaseURL(),
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
