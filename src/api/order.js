import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:7070/api/'}),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => {
        return { url: 'order', method: 'POST', body: data }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateOrderMutation,
} = orderApi;
