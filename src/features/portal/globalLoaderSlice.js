import { createSlice } from "@reduxjs/toolkit";

export const globalLoaderSlice = createSlice({
  name: "showGlobalLoader",
  initialState: false,
  reducers: {
    toggleLoader: (state) => !state,
    showLoader: () => true,
    hideLoader: () => false,
  },
});

export const {
  toggleLoader,
  showLoader,
  hideLoader,
} = globalLoaderSlice.actions;

export const currentGlobalLoaderState = (state) => state.showGlobalLoader;

export default globalLoaderSlice.reducer;
