import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort_by: "popularity.desc",
  with_genres: "all",
  primary_release_year: "all",
};

const filtersSlice = createSlice({
  name: "@@filters",
  initialState,
  reducers: {
    updateFilters(state, action) {
      state[action.payload.filter] = action.payload.value;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { updateFilters, resetFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
