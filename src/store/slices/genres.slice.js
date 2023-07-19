import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY_4 = process.env.REACT_APP_API_KEY_4;
const API_URL = "https://api.themoviedb.org/3";

export const fetchGenres = createAsyncThunk(
  "@@genres/fetchGenres",
  async () => {
    const response = await fetch(`${API_URL}/genre/movie/list?language=uk-UK`, {
      method: "GET",
      mode: "cors",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${API_KEY_4}`,
      },
    });
    const data = await response.json();
    return data;
  }
);

const genresSlice = createSlice({
  name: "@@genres",
  initialState: {
    entities: [],
    error: null,
    loading: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload.genres;
      });
  },
});

export const { setGenres } = genresSlice.actions;
export const genresReducer = genresSlice.reducer;
