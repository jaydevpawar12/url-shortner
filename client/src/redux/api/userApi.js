import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_URL}/api/v1/user`, credentials: "include" }),
    tagTypes: ["url"],
    endpoints: (builder) => {
        return {
            getUsers: builder.query({
                query: () => {
                    return {
                        url: "/url",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                transformErrorResponse: (err, { response, request }) => {
                    if (response.status === 401) {
                        localStorage.removeItem("auth")
                        return 404
                    }
                    return err
                },
                providesTags: ["url"]
            }),

            addUser: builder.mutation({
                query: urlData => {
                    return {
                        url: "/url-create",
                        method: "POST",
                        body: urlData
                    }
                },
                transformErrorResponse: err => err.data.message,
                invalidatesTags: ["url"]
            }),

            updateUrl: builder.mutation({
                query: urlData => {
                    return {
                        url: `/url-update/${urlData._id}`,
                        method: "PUT",
                        body: urlData
                    }
                },
                invalidatesTags: ["url"]
            }),

            deleteUrl: builder.mutation({
                query: id => {
                    return {
                        url: `/url-remove/${id}`,
                        method: "DELETE",

                    }
                },
                invalidatesTags: ["url"]
            }),

        }
    }
})

export const {
    useGetUsersQuery,
    useAddUserMutation,
    useUpdateUrlMutation,
    useDeleteUrlMutation
} = userApi
