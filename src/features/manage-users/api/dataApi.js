import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../constants";
import { getTokenFromCookies } from "../../../shared/getToken.mjs";

const apiBasePath = "/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getTokenFromCookies();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => `${apiBasePath}`,
    }),
    getUserById: builder.query({
      query: (id) => ({ url: `${apiBasePath}/${id}` }),
    }),
    addUser: builder.mutation({
      query: (data) => ({ url: `${apiBasePath}`, method: "POST", body: data }),
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${apiBasePath}/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `${apiBasePath}/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useAddUserMutation,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
