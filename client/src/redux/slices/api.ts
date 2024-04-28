import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000",
        credentials: "include",
    }),
    tagTypes: ["myCodes", "allCodes", "updateUser"],
    endpoints: (builder) => ({
        saveCode: builder.mutation({
            query: (fullCode) => {
                return {
                    url: "/editor/save",
                    method: "POST",
                    body: fullCode,
                };
            },
            invalidatesTags: ["myCodes", "allCodes"],
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
        updateUser: builder.mutation({
            query: (body) => ({
                url: "/auth/update",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["updateUser"],
        }),
        getAllCodes: builder.query({
            query: () => ({
                url: "/editor/all",
                cache: "no-store",
            }),
            providesTags: ["allCodes"],
        }),
        getMyCodes: builder.query({
            query: () => ({
                url: "/editor/my-code",
                cache: "no-store",
            }),
            providesTags: ["myCodes"],
        }),
        deleteCode: builder.mutation({
            query: (_id) => ({
                url: `/editor/delete/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["myCodes", "allCodes"],
        }),
        editCode: builder.mutation({
            query: ({ fullCode, id }) => {
                return {
                    url: `/editor/edit/${id}`,
                    method: "PUT",
                    body: fullCode,
                };
            },
        }),
    })
})

export const { useSaveCodeMutation,
    useLoadCodeMutation,
    useSignupMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetUserDetailsQuery,
    useGetAllCodesQuery,
    useGetMyCodesQuery,
    useDeleteCodeMutation,
    useEditCodeMutation,
    useUpdateUserMutation
} = api;