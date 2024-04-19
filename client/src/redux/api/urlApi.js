import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const urlApi = createApi({
    reducerPath: "urlApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_URL}/api/v1/url` }),
    endpoints: (builder) => {
        return {
            getPublicUrl: builder.query({
                query: id => {
                    return {
                        url: `/${id}`,
                        method: "GET",

                    }
                },
                transformResponse: data => data.result
            }),


        }
    }
})

export const { useGetPublicUrlQuery } = urlApi
