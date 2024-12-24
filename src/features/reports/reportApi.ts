import { DisbursementType, TransactionType } from "./types";

import { baseURL } from "@/lib/constants/GlobalURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reportApi = createApi({
  reducerPath: "reportApi",
  tagTypes: ["Transactions", "Disbursements", "Sales"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTransactionsReports: builder.query<TransactionType[], string>({
      query: (searchParam) => ({
        url: `report/report_api_view/`,
        params: { query: searchParam }, // Add query parameters here
      }),

      providesTags: ["Transactions"],
    }),

    getDisbursementReports: builder.query<DisbursementType[], string>({
      query: (searchParam) => ({
        url: `report/report_api_view/`,
        params: { query: searchParam }, // Add query parameters here
      }),

      providesTags: ["Disbursements"],
    }),
  }),
});

export const {
  useGetTransactionsReportsQuery,
  useGetDisbursementReportsQuery,
} = reportApi;
