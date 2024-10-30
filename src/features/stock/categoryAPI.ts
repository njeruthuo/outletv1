import { baseURL } from "@/lib/constants/GlobalURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryAPI = createApi({
  reducerPath: "categoryAPI",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "stock/category_api_view/",
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoryQuery } = categoryAPI;
