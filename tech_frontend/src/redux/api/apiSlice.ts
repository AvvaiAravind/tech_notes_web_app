import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3500";

const apiSlice = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Note", "User"],
  endpoints: () => ({}),
});

export default apiSlice;
