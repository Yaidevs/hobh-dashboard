import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../constants";
import { getTokenFromCookies } from "../../../shared/getToken.mjs";

const apiBasePath = "/instructor";

export const instructorApi = createApi({
  reducerPath: "instructorApi",
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
    getAllInstructor: builder.query({
      query: () => `${apiBasePath}`,
    }),
    getInstructorById: builder.query({
      query: (id) => ({ url: `${apiBasePath}/${id}` }),
    }),
    addInstructor: builder.mutation({
      query: (data) => ({ url: `${apiBasePath}`, method: "POST", body: data }),
    }),

    updateInstructor: builder.mutation({
      query: ({ id, data }) => ({
        url: `${apiBasePath}/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteInstructor: builder.mutation({
      query: (id) => ({ url: `${apiBasePath}/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetAllInstructorQuery,
  useAddInstructorMutation,
  useGetInstructorByIdQuery,
  useDeleteInstructorMutation,
  useUpdateInstructorMutation,
} = instructorApi;
