import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

interface AxiosBaseQueryArgs {
  url: string;
  method: AxiosRequestConfig["method"];
  data: AxiosRequestConfig["data"];
  params: AxiosRequestConfig["params"];
}

interface AxiosBaseQueryMeta {}

interface SuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
  metaData?: any;
}

interface ErrorResponse<T> {
  success: boolean;
  devMessage?: string;
  message: string;
  data?: T;
  metaData?: any;
}

const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // need to change that to true after authentication
});

// After implementing authorization and authentication

/* axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
); */

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    AxiosBaseQueryArgs, // Argument type (input from endpoints)
    SuccessResponse<any>, // Result type (response body)
    ErrorResponse<any>, // Error type
    {}, // Extra options passed from endpoint (rarely used)
    AxiosBaseQueryMeta // Meta info returned optionally
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const res = err.response?.data;
        return {
          error: {
            success: res?.success,
            status: err.response?.status || 500,
            message: res?.message || err.message || "An error occurred",
            devMessage: res?.devMessage,
            data: res?.data,
            metaData: res?.metaData,
          },
        };
      }
      return {
        error: {
          success: false,
          status: "UNKNOWN_ERROR",
          message: "An unknown error occurred",
        },
      };
    }
  };

export default axiosBaseQuery;
