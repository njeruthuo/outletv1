import { baseURL } from "@/lib/constants/GlobalURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
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
    deleteStock: builder.mutation({
      query: ({ id }) => ({
        url: `/stock/stock_api_view/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Stock"],
    }),
    searchStock: builder.query({
      query: (searchText) => `stock/stock_api_view/?search=${searchText}`,
      providesTags: ["Stock"],
    }),
  }),
});

export const {
  useGetStockItemsQuery,
  useAddStockMutation,
  useUpdateStockMutation,
  useDeleteStockMutation,
  useSearchStockQuery,
} = stockApi;
