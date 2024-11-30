import { baseURL } from "@/lib/constants/GlobalURL";
import { RootState } from "@/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const salesAPI = createApi({
  reducerPath: "salesAPI",
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
  tagTypes: ["Sales", "Shop"],
  endpoints: (builder) => ({
    // Get a list of shops.
    getShopList: builder.query({
      query: () => "shop/shop_api_view/",
      providesTags: ["Sales", "Shop"],
    }),

    // Get the shop associated with a particular Employee.
    getEmployeeShop: builder.query({
      query: () => "shop/shop_api_view/",
      providesTags: ["Sales", "Shop"],
    }),

    // Create a new shop
    addShop: builder.mutation({
      query: (values) => ({
        url: "shop/shop_api_view/",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Sales"],
    }),

    // Add an employee to shop.
    addEmployee: builder.mutation({
      query: (values) => ({
        url: "users/register_new_employees/",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Sales"],
    }),

    // Initiate a payment request to the backend.
    requestPaymentOnSale: builder.mutation({
      query: (values) => ({
        url: "external/initiate-payment/",
        method: "POST",
        body: values,
      }),
    }),

    // Initiate stock and profit calculation.
    completeSaleRequest: builder.mutation({
      query: (values) => ({
        url: "external/complete-purchase-calculations/",
        method: "POST",
        body: values,
      }),
    }),
  }),
});

export const {
  useGetShopListQuery,
  useAddShopMutation,
  useAddEmployeeMutation,
  useCompleteSaleRequestMutation,
  useRequestPaymentOnSaleMutation,
} = salesAPI;
