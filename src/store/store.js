import { configureStore } from "@reduxjs/toolkit";
import { filtersReducer } from "./slices/filters.slice";
import { genresReducer } from "./slices/genres.slice";
import { favoritesReducer } from "./slices/favorites.slice";
import * as apiService from "../services/apiService";
import { authReducer } from "./slices/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersReducer,
    genres: genresReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: apiService,
      },
    }),
});
