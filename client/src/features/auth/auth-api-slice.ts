import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { User } from '../../types/user.ts'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
})

export const apiAuthSlice = createApi({
  reducerPath: 'apiAuth',
  baseQuery,
  tagTypes: ['User', 'Todos'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: '/auth/register',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User', 'Todos'],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User', 'Todos'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Todos'],
    }),
    fetchUser: builder.query<User, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useFetchUserQuery } = apiAuthSlice
