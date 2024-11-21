import { baseURL } from "@/lib/constants/GlobalURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const salesAPI = createApi({
  reducerPath: "salesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["Sales", "Shop"],
  endpoints: (builder) => ({
    // Get a list of shops
    getShopList: builder.query({
      query: () => "shop/shop_api_view/",
      providesTags: ["Sales"],
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

    // Add an employee to shop
    addEmployee: builder.mutation({
      query: (values) => ({
        url: "users/register_new_employees/",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Sales"],
    }),

    requestPaymentOnSale: builder.mutation({
      query: (values) => ({
        url: "external/initiate-payment/",
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
  useRequestPaymentOnSaleMutation,
} = salesAPI;
