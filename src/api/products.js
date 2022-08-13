import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:7070/api/'}),
  endpoints: (builder) => ({
    getTopSales: builder.query({
      query: () => 'top-sales',
    }),
    getListCategories: builder.query({
      query: () => 'categories',
    }),
    getCategoryItems: builder.query({
      query: ({ categoryId, offset, q }) => {
        const searchParams = new URLSearchParams({ categoryId, offset, q });
        if (categoryId === 0) {
          searchParams.delete('categoryId')
        }

        if (!q) {
          searchParams.delete('q');
        }

        return {
          url: `items?${searchParams.toString()}`,
          method: 'GET',
        }
      }
    }),
    getProductDetail: builder.query({
      query: (id) => `items/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLazyGetTopSalesQuery,
  useLazyGetListCategoriesQuery,
  useLazyGetCategoryItemsQuery,
  useLazyGetProductDetailQuery,
} = productsApi;
