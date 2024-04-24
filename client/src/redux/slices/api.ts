import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000",
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
        })
    })
})

export const { useSaveCodeMutation, useLoadCodeMutation } = api;