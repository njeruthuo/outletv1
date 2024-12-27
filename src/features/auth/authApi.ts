import { baseURL } from "@/lib/constants/GlobalURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");

      const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        ?.split("=")[1];

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      if (csrfToken) {
        headers.set("X-CSRFToken", csrfToken);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "users/login/",
        method: "POST",
        body: credentials,
      }),
    }),

    changePassword: builder.mutation({
      query: (credentials) => ({
        url: "users/change_user_password/",
        method: "PUT",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useChangePasswordMutation } = authApi;
