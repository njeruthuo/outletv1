import { baseURL } from "@/lib/constants/GlobalURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandAPI = createApi({
  reducerPath: "brandAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["Brand"],
  endpoints: (builder) => ({
    getBrand: builder.query({
      query: () => "stock/brand_api_view/",
      providesTags: ["Brand"],
    }),
  }),
});

export const { useGetBrandQuery } = brandAPI;
