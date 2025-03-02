import axios, { AxiosRequestConfig } from "axios";
import { headers } from "next/headers";

export const call = {
  get: async (url: string, options?: AxiosRequestConfig) => {
    //@ts-ignore
    return axios.get(url, {
      headers: {
        //@ts-ignore
        cookie: headers().get("cookie"),
        ...options?.headers,
      },
      ...options,
    });
  },
  post: async (url: string, body: any, options?: AxiosRequestConfig) => {
    return axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        //@ts-ignore
        cookie: headers().get("cookie"),
        ...options?.headers,
      },
      ...options,
    });
  },
  put: async (url: string, body: any, options?: AxiosRequestConfig) => {
    return axios.put(url, body, {
      headers: {
        "Content-Type": "application/json",
        //@ts-ignore
        cookie: headers().get("cookie"),
        ...options?.headers,
      },
      ...options,
    });
  },
  delete: async (url: string, options?: AxiosRequestConfig) => {
    return axios.delete(url, {
      headers: {
        //@ts-ignore
        cookie: headers().get("cookie"),
        ...options?.headers,
      },
      ...options,
    });
  },
};
