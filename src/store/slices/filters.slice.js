import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "@@filters",
  initialState: {
    sort_by: "popularity.desc",
    with_genres: "all",
    primary_release_year: "all",
  },
  reducers: {
    updateFilters(state, action) {
      state[action.payload.filter] = action.payload.value;
    },
  },
});

export const { updateFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
