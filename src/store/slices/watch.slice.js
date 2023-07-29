import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

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

const watchListAdapter = createEntityAdapter({
  selectId: (movie) => movie.id,
});

const watchSlice = createSlice({
  name: "@@watchList",
  initialState: watchListAdapter.getInitialState({
    loading: "idle",
    error: null,
    total_pages: 0,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchList.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchWatchList.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.total_pages = action.payload.total_pages;
        watchListAdapter.addMany(state, action.payload.results);
      })
      .addCase(fetchWatchList.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export const watchListSelectors = watchListAdapter.getSelectors(
  (state) => state.watchList
);

export const watchListReducer = watchSlice.reducer;
