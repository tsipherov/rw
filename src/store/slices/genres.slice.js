import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createFetchOptions } from "../../utils/createFetchOptions";
import ApiService from "../../services/apiService";

const API_URL = "https://api.themoviedb.org/3";
// const apiService = new ApiService();

export const fetchGenres = createAsyncThunk(
  "@@genres/fetchGenres",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/genre/movie/list?language=uk-UK`,
        createFetchOptions()
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          `${data.status_message} Status code: ${data.status_code}`
        );
      }
      return data;
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
