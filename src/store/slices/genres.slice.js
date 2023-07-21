import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchGenres = createAsyncThunk(
  "@@genres/fetchGenres",
  async (_, { rejectWithValue, extra }) => {
    try {
      return extra.getGenres();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const genresSlice = createSlice({
  name: "@@genres",
  initialState: {
    entities: [],
    error: null,
    loading: "idle", //loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.entities = action.payload.genres;
      });
  },
});

export const genresReducer = genresSlice.reducer;
