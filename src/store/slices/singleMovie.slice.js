import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSingleMovie = createAsyncThunk(
  "@@singleMovie/fetchSingleMovie",
  async (movie_id, { extra, rejectWithValue }) => {
    try {
      return extra.getMovieDetails(movie_id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchStateSingleMovie = createAsyncThunk(
  "@@singleMovie/fetchStateSingleMovie",
  async (movie_id, { extra, rejectWithValue }) => {
    try {
      return extra.movieAccountStates(movie_id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleMovieCollection = createAsyncThunk(
  "@@singleMovie/fetchSingleMovieCollection",
  async (collection_id, { extra, rejectWithValue }) => {
    try {
      return extra.getCollectionDetails(collection_id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTrailer = createAsyncThunk(
  "@@singleMovie/fetchTrailer",
  async (movie_id, { extra, rejectWithValue }) => {
    try {
      return extra.getVideo(movie_id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleStateMovie = createAsyncThunk(
  "@@singleMovie/toggleStateMovie",
  async (
    { prop, account_id, movie_id, reqOptions },
    { extra, rejectWithValue, dispatch }
  ) => {
    try {
      let response;
      if (prop === "favorite")
        response = await extra.toggleFavorite({ account_id, reqOptions });
      if (prop === "watchlist")
        response = await extra.toggleToWatchlist({ account_id, reqOptions });

      if (response.success) {
        dispatch(fetchStateSingleMovie(movie_id));
      } else {
        throw new Error(response.status_message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  movieLoading: "idle",
  loading: "idle",
  error: null,
  movie: null,
  stateMovie: null,
  videoLink: null,
  collection: null,
};

const singleMovieSlice = createSlice({
  name: "@@singleMovie",
  initialState,
  reducers: {
    // setDefaultState(state) {
    //   state = initialState;
    // },
    setDefaultCollection(state) {
      state.collection = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleMovie.pending, (state) => {
        state.movieLoading = "pending";
      })
      .addCase(fetchSingleMovie.fulfilled, (state, action) => {
        state.movieLoading = "succeeded";
        state.movie = action.payload;
      })
      .addCase(fetchStateSingleMovie.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.stateMovie = action.payload;
      })
      .addCase(fetchTrailer.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.videoLink = action.payload;
      })
      .addCase(fetchSingleMovieCollection.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.collection = action.payload;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("@@singleMovie/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = "pending";
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("@@singleMovie/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const { setDefaultCollection } = singleMovieSlice.actions;

export const singleMovieReducer = singleMovieSlice.reducer;
