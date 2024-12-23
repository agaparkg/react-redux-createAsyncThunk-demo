import { configureStore } from "@reduxjs/toolkit";
import { itemsApi } from "./itemsApi"; // Path to your RTK Query slice

const store = configureStore({
  reducer: {
    [itemsApi.reducerPath]: itemsApi.reducer, // Add the RTK Query slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemsApi.middleware), // Add RTK Query middleware
});

export default store;
