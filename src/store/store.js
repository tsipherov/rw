import { configureStore } from "@reduxjs/toolkit";
import { filtersReducer } from "./slices/filters.slice";
import { genresReducer } from "./slices/genres.slice";
import { favoritesReducer } from "./slices/favorites.slice";
import { authReducer } from "./slices/auth.slice";
import { watchListReducer } from "./slices/watch.slice";
import * as apiService from "../services/apiService";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersReducer,
    genres: genresReducer,
    favorites: favoritesReducer,
    watchList: watchListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: apiService,
      },
    }),
});
