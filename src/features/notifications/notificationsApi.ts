import { baseURL } from "@/lib/constants/GlobalURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
      }

      return headers;
    },
  }),
  tagTypes: ["Notifications"],
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => `/notifications/notification_api_view/`,
      providesTags: ["Notifications"],
    }),
    setNotificationRead: builder.mutation({
      query: (id) => ({
        url: "/notifications/notification_api_view/",
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const { useGetNotificationsQuery, useSetNotificationReadMutation } =
  notificationsApi;
