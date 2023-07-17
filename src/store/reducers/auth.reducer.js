import { createReducer } from "@reduxjs/toolkit";
import { authSessionId, authUser } from "../actions/auth.actions";

export const authReducer = createReducer(
  { sessionId: null, user: null },
  (builder) => {
    builder
      .addCase(authSessionId, (state, action) => {
        state.sessionId = action.payload;
      })
      .addCase(authUser, (store, action) => {
        store.user = action.payload;
      });
  }
);
