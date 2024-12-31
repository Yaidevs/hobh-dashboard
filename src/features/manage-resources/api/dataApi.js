import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../constants";
import { getTokenFromCookies } from "../../../shared/getToken.mjs";

const apiBasePath = "/resource";

export const resourceApi = createApi({
  reducerPath: "resourceApi",
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
    getAllItem: builder.query({
      query: () => `${apiBasePath}`,
    }),
    getItemById: builder.query({
      query: (id) => ({ url: `${apiBasePath}/${id}` }),
    }),
    addItem: builder.mutation({
      query: (data) => ({ url: `${apiBasePath}`, method: "POST", body: data }),
    }),

    updateItem: builder.mutation({
      query: ({ id, data }) => ({
        url: `${apiBasePath}/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteItem: builder.mutation({
      query: (id) => ({ url: `${apiBasePath}/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetAllItemQuery,
  useAddItemMutation,
  useGetItemByIdQuery,
  useDeleteItemMutation,
  useUpdateItemMutation,
} = resourceApi;
