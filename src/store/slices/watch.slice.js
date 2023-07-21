import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchWatchList = createAsyncThunk(
  "@@watchList/fetchWatchList",
  async (serviceProps, { extra, rejectWithValue }) => {
    try {
      return extra.getWatchlistMovies(serviceProps);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const watchSlice = createSlice({
  name: "@@watchList",
  initialState: {
    loading: "idle",
    entities: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchList.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchWatchList.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.entities = action.payload;
      })
      .addCase(fetchWatchList.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export const watchListReducer = watchSlice.reducer;
