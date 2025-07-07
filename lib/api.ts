import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { headers } from "next/headers";

// Define a type for the server object
type ServerApi = {
  get: <T = any>(url: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  post: <T = any>(
    url: string,
    body?: any,
    options?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  put: <T = any>(
    url: string,
    body?: any,
    options?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  delete: <T = any>(url: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
};

// Helper function to get cookies from headers
const getCookies = async () => {
  const cookieHeader = (await headers()).get("cookie");
  return cookieHeader ? { cookie: cookieHeader } : {};
};

// Create the server object
export const server: ServerApi = {
  get: async <T = any>(url: string, options?: AxiosRequestConfig) => {
    return axios.get<T>(url, {
      ...options,
      headers: {
        ...(await getCookies()),
        ...options?.headers,
      },
    });
  },

  post: async <T = any>(url: string, body?: any, options?: AxiosRequestConfig) => {
    return axios.post<T>(url, body, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(await getCookies()),
        ...options?.headers,
      },
    });
  },

  put: async <T = any>(url: string, body?: any, options?: AxiosRequestConfig) => {
    return axios.put<T>(url, body, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(await getCookies()),
        ...options?.headers,
      },
    });
  },

  delete: async <T = any>(url: string, options?: AxiosRequestConfig) => {
    return axios.delete<T>(url, {
      ...options,
      headers: {
        ...(await getCookies()),
        ...options?.headers,
      },
    });
  },
};

