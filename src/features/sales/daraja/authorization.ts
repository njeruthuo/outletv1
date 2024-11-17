import { mpesaSandboxURL } from "@/lib/constants/GlobalURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Define your client key and secret here or fetch them from environment variables
const clientKey = import.meta.env.VITE_PUBLIC_MPESA_CLIENT_KEY;
const clientSecret = import.meta.env.VITE_PUBLIC_MPESA_CLIENT_SECRET;

// Encode the client key and secret for basic authentication
const basicAuth = btoa(`${clientKey}:${clientSecret}`);

export const darajaAPI = createApi({
  reducerPath: "darajaAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: mpesaSandboxURL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Basic ${basicAuth}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Daraja"],
  endpoints: (builder) => ({
    getAccessTokens: builder.query({
      query: () => "/oauth/v1/generate?grant_type=client_credentials",
      providesTags: ["Daraja"],
    }),
  }),
});

// Explicitly export the hook
export const { useGetAccessTokensQuery } = darajaAPI;
