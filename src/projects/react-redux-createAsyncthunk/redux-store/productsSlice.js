import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "https://www.course-api.com/javascript-store-products";

const initialState = {
  products: [],
  isLoading: true,
};

export const getProducts = createAsyncThunk("cart/getProducts", () => {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase();
  },
});

export default productsSlice.reducer;
