import { baseURL } from "@/lib/constants/GlobalURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  tagTypes: ["Stock disbursements"],
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
    getStockDisbursements: builder.query({
      query: () => `shop/shop_stock_disbursement_api_view/`,
      providesTags: ["Stock disbursements"],
    }),

    getTransactionLogs: builder.query({
      query: () => `external/transaction_logs_api_view/`,
      providesTags: ["Stock disbursements"],
    }),
  }),
});

export const { useGetStockDisbursementsQuery, useGetTransactionLogsQuery } =
  dashboardApi;
