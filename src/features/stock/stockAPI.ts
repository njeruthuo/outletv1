import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  tagTypes: ["Stock"],
  endpoints: (builder) => ({
    getStockItems: builder.query({
      query: () => "stock/stock_api_view/",
      providesTags: ["Stock"],
    }),
    addStock: builder.mutation({
      query: (newStock) => ({
        url: "/stock/stock_api_view/",
        method: "POST",
        body: newStock,
      }),
      invalidatesTags: ["Stock"],
    }),
    updateStock: builder.mutation({
      query: ({ id, ...updatedStock }) => ({
        url: `/stock/stock_api_view/${id}/`,
        method: "PUT",
        body: updatedStock,
      }),
      invalidatesTags: ["Stock"],
    }),
  }),
});

export const {
  useGetStockItemsQuery,
  useAddStockMutation,
  useUpdateStockMutation,
} = stockApi;
