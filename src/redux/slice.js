import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperDetails } from "./operations";

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    list: [],
    filters: {},
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    status: "idle",
    error: null,
    camperDetails: null,
  },
  reducers: {
    setCampers(state, action) {
      state.list = action.payload;
    },
    setCamperDetails(state, action) {
      state.camperDetails = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    addFavorite(state, action) {
      state.favorites.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Перевіряємо, що action.payload є масивом
        state.list = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCamperDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCamperDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.camperDetails = action.payload;
      })
      .addCase(fetchCamperDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setCampers,
  setCamperDetails,
  setFilters,
  addFavorite,
  removeFavorite,
} = campersSlice.actions;
export default campersSlice.reducer;
