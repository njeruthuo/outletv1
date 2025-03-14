import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "@/lib/constants/GlobalURL";
import { salesAPI } from "../sales/salesAPI";
import { RootState } from "@/store/store";

export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Stock"],
  endpoints: (builder) => ({
    // Fetch a list of stock items
    getStockItems: builder.query({
      query: () => "stock/stock_api_view/",
      providesTags: ["Stock"],
    }),

    // Add stock Item
    addStock: builder.mutation({
      query: (newStock) => ({
        url: "/stock/stock_api_view/",
        method: "POST",
        body: newStock,
      }),
      invalidatesTags: ["Stock"],
    }),

    // Update stock
    updateStock: builder.mutation({
      query: ({ id, ...updatedStock }) => ({
        url: `/stock/stock_api_view/${id}/`,
        method: "PUT",
        body: updatedStock,
      }),
      invalidatesTags: ["Stock"],
    }),

    // Delete a stock item
    deleteStock: builder.mutation({
      query: ({ id }) => ({
        url: `/stock/stock_api_view/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Stock"],
    }),

    // Disburse Stock to a shop
    disburseToShop: builder.mutation({
      query: ({ disburseQuantity, product_name, shop }) => ({
        url: `/shop/shop_disbursement/`,
        method: "POST",
        body: { disburseQuantity, product_name, shop },
      }),
      invalidatesTags: ["Stock"],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        console.log(arg);
        try {
          // Wait for the disbursement to complete
          await queryFulfilled;

          // Trigger refetch or invalidate on salesAPI
          dispatch(
            salesAPI.util.invalidateTags(["Shop"]) // Invalidate Shop tags to trigger refetch
          );

          // Alternatively, if you want to trigger a query (e.g., refetch getShopList):
          // dispatch(salesAPI.endpoints.getShopList.initiate());
        } catch (error) {
          console.error("Error disbursing stock: ", error);
        }
      },
    }),

    // Handle searching
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
  useDisburseToShopMutation,
} = stockApi;
