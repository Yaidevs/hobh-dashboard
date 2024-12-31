import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../constants";


export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery(
		{baseUrl: BASE_URL}
	),
	endpoints: (builder) => (
		{
			login: builder.mutation(
				{
					query: (data) => (
						{url: `admin/login`, method: "POST", body: data}
					)
				}
			)
		}
	)
});

export const {useLoginMutation} = authApi;