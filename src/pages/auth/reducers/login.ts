import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi", // Name of the reducer
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/users/" }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "login/", // Your login endpoint
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: { token: string }) => {
        console.log(response, "login response");
        // You can process the response here if needed
        return { token: response.token };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
