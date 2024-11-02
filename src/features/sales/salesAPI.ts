import { baseURL } from "@/lib/constants/GlobalURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const salesAPI = createApi({
  reducerPath: "salesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["Sales", "Shop"],
  endpoints: (builder) => ({
    getShopList: builder.query({
      query: () => "shop/shop_api_view/",
      providesTags: ["Sales"],
    }),
    addShop: builder.mutation({
      query: (values) => ({
        url: "shop/shop_api_view/",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Sales"],
    }),
  }),
});

export const { useGetShopListQuery, useAddShopMutation } = salesAPI;
