import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCampersFromAPI, fetchCamperById } from "./services";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters, { rejectWithValue }) => {
    try {
      const data = await fetchCampersFromAPI(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCamperDetails = createAsyncThunk(
  "campers/fetchCamperDetails",
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchCamperById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
