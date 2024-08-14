import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ProfileDataForRegistration } from "../../types/profile.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",
});

export const apiProfileSlice = createApi({
  reducerPath: "apiProfile",
  baseQuery,
  tagTypes: ["ProfileDataForRegistration"],
  endpoints: (builder) => ({
    bregister: builder.mutation({
      query: (profile: ProfileDataForRegistration) => ({
        url: "/profile/register",
        method: "POST",
        body: profile,
      }),
      invalidatesTags: ["ProfileDataForRegistration"],
    }),
  }),
});

export const { useBregisterMutation } = apiProfileSlice;
