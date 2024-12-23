import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemsSlice"; // Import your slice reducer(s)

const store = configureStore({
  reducer: {
    items: itemsReducer, // Add your slice reducer(s) here
  },
});

export default store;
