import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminAPi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_URL}/api/v1/admin`, credentials: "include" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            getAdminUsers: builder.query({
                query: () => {
                    return {
                        url: "/user",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                transformErrorResponse: (err, { response }) => {
                    if (response.status === 401) {
                        return 401
                    }
                    return err
                },
                providesTags: ["user"]
            }),

            getAdminUsersUrls: builder.query({
                query: id => {
                    return {
                        url: `/user/url/${id}`,
                        method: "GET"
                    }
                },
                transformResponse: data => data.result
            }),
            updateAdminUsers: builder.mutation({
                query: userData => {
                    return {
                        url: `/user/${userData._id}`,
                        method: "PUT",
                        body: userData
                    }
                },
                transformErrorResponse: error => error.data.message,
                invalidatesTags: ["user"]
            }),


        }
    }
})

export const {
    useGetAdminUsersQuery,
    useLazyGetAdminUsersUrlsQuery,
    useUpdateAdminUsersMutation
} = adminApi
