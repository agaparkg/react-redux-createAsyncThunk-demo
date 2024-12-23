import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://61008c3dbca46600171cf917.mockapi.io/api/v1/fake-items";

// Define an API slice
export const itemsApi = createApi({
  reducerPath: "itemsApi", // Name of the slice
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }), // Base URL for API
  tagTypes: ["Items"], // Tags for cache invalidation
  endpoints: (builder) => ({
    // GET Items
    getItems: builder.query({
      query: () => "/",
      providesTags: ["Items"], // Cache invalidation tag
    }),
    // POST Item
    createItem: builder.mutation({
      query: (newItem) => ({
        url: "/",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["Items"], // Invalidate cache after mutation
    }),
    // DELETE Item
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"], // Invalidate cache after mutation
    }),
    // PUT (Update) Item
    updateItem: builder.mutation({
      query: (updatedItem) => {
        const { id, ...data } = updatedItem;
        return {
          url: `/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Items"], // Invalidate cache after mutation
    }),
  }),
});

// Export auto-generated hooks
export const {
  useGetItemsQuery,
  useCreateItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
} = itemsApi;

// Add the API slice reducer to the store in `store.js`
