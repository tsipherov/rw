import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth.reducer";
import { filtersReducer } from "./slices/filters.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersReducer,
  },
});
