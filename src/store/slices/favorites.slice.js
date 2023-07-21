import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFavoriteMovies = createAsyncThunk(
  "@@favorites/fetchFavoriteMovies",
  async (props, { rejectWithValue, extra }) => {
    try {
      return extra.getFavoriteMovies(props);
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
