import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ProfileDataForRegistration, ProfileId } from "../../types/profile.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",
});

export const apiProfileSlice = createApi({
  reducerPath: "apiProfile",
  baseQuery,
  tagTypes: ["ProfileDataForRegistration", "ProfileId"],
  endpoints: (builder) => ({
    bregister: builder.mutation({
      query: (profile: ProfileDataForRegistration) => ({
        url: "/profile/register",
        method: "POST",
        body: profile,
      }),
      invalidatesTags: ["ProfileDataForRegistration"],
    }),
    matching: builder.mutation({
      query: (id: ProfileId) => ({
        url: "/matching/add",
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["ProfileId"],
    }),
    fetchTeacher: builder.query<ProfileDataForRegistration[], void>({
      query: () => "/matching/teachers",
      providesTags: ["ProfileId"],
    }),
  }),
});

export const {
  useBregisterMutation,
  useMatchingMutation,
  useFetchTeacherQuery,
} = apiProfileSlice;
