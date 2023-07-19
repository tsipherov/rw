import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const API_KEY_4 = process.env.REACT_APP_API_KEY_4;
// const API_URL = "https://api.themoviedb.org/3";
const initialState = {
  sort_by: "popularity.desc",
  with_genres: "all",
  primary_release_year: "all",
};

// export const fetchGenres = createAsyncThunk(
//   "@@filters/fetchGenres",
//   async (_, { dispatch }) => {
//     const response = await fetch(`${API_URL}/genre/movie/list?language=uk-UK`, {
//       method: "GET",
//       mode: "cors",
//       headers: {
//         accept: "application/json",
//         "content-type": "application/json",
//         Authorization: `Bearer ${API_KEY_4}`,
//       },
//     });
//     const data = await response.json();
//     return data;
//   }
// );

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

// getGenre = async ({ reqOptions }) => {
//   const response = await fetch(
//     `${API_URL}/genre/movie/list?language=uk-UK`,
//     reqOptions
//   );
//   const data = await response.json();
//   if (response.ok) {
//     return data;
//   } else {
//     throw new Error(`${data.status_message} Status code: ${data.status_code}`);
//   }
// };
