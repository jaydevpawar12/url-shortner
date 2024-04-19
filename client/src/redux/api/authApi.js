import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_URL}/api/v1/auth`, credentials: "include" }),

    endpoints: (builder) => {
        return {

            register: builder.mutation({
                query: userData => {
                    return {
                        url: "/register",
                        method: "POST",
                        body: userData
                    }
                },

            }),

            login: builder.mutation({
                query: userData => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("auth", JSON.stringify(data.result))
                    return data.result
                }

            }),

            logout: builder.mutation({
                query: userData => {
                    return {
                        url: "/logout",
                        method: "POST",

                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("auth")
                    return data
                }

            }),

        }
    }
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApi
