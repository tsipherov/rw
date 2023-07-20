import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth.reducer";
import { filtersReducer } from "./slices/filters.slice";
import { genresReducer } from "./slices/genres.slice";
import { favoritesReducer } from "./slices/favorites.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersReducer,
    genres: genresReducer,
    favorites: favoritesReducer,
  },
});
