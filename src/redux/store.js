import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./slice";

const store = configureStore({
  reducer: {
    campers: campersReducer,
  },
});

export default store;
