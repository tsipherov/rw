import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createFetchOptions } from "../../utils/createFetchOptions";

const API_URL = "https://api.themoviedb.org/3";

export const fetchFavoriteMovies = createAsyncThunk(
  "@@favorites/fetchFavoriteMovies",
  async ({ serviceProps }, { rejectWithValue }) => {
    try {
      const [account_id, page] = serviceProps;
      const response = await fetch(
        `${API_URL}/account/${account_id}/favorite/movies?page=${page}&language=uk-UA`,
        createFetchOptions()
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          `${result.status_message} Status code: ${result.status_code}`
        );
      }
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: "@@favorites",
  initialState: {
    entities: {},
    error: null,
    loading: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteMovies.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchFavoriteMovies.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.entities = action.payload;
      })
      .addCase(fetchFavoriteMovies.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export const favoritesReducer = favoritesSlice.reducer;
