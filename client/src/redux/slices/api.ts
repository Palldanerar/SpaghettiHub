import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        saveCode: builder.mutation({
            query: (fullCode) => {
                return {
                    url: "/editor/save",
                    method: "POST",
                    body: fullCode,
                };
            },
        }),
        loadCode: builder.mutation({
            query: (id) => {
                return {
                    url: `/editor/load/${id}`,
                    method: "GET",

                }
            }
        }),
        signup: builder.mutation({
            query: (body) => ({
                url: "/auth/signup",
                method: "POST",
                body: body,
            }),
        }),
        login: builder.mutation({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body: body,
                credentials: "include",
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
        }),
        getUserDetails: builder.query({
            query: () => ({
                url: "/auth/details",
                cache: "no-store"
            }),
        }),
    })
})

export const { useSaveCodeMutation, useLoadCodeMutation, useSignupMutation, useLoginMutation, useLogoutMutation, useGetUserDetailsQuery } = api;