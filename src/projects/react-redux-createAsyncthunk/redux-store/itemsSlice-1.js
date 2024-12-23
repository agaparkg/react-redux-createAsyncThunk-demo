import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL
// const API_URL = "https://api.example.com/items";
const API_URL = "https://61008c3dbca46600171cf917.mockapi.io/api/v1/fake-items";

// GET Items
export const fetchItems = createAsyncThunk(
  "items/fetchAll",
  async () => (await axios.get(API_URL)).data
);

// POST Item
export const createItem = createAsyncThunk(
  "items/create",
  async (newItem) => (await axios.post(API_URL, newItem)).data
);

// DELETE Item
export const deleteItem = createAsyncThunk(
  "items/delete",
  async (id) => (await axios.delete(`${API_URL}/${id}`)).data.id
);

// PUT (Update) Item
export const updateItem = createAsyncThunk(
  "items/update",
  async (updatedItem) => {
    const { id, ...data } = updatedItem;
    return (await axios.put(`${API_URL}/${id}`, data)).data;
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    data: [], // Holds the fetched data
    status: "idle", // Tracks the loading state: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Holds error messages, if any
  },
  extraReducers: (builder) => {
    builder
      // Pending: Update status to "loading"
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear any previous errors
      })
      // Fulfilled: Update status to "succeeded" and store the data
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      // Rejected: Update status to "failed" and store the error
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        state.data[index] = action.payload;
      });
  },
  selectors: {
    selectItems: (state) => state.data,
    selectLoadStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
});

export const { selectError, selectItems, selectLoadStatus } =
  itemsSlice.selectors;

export default itemsSlice.reducer;
