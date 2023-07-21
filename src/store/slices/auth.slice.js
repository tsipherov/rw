import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSession = createAsyncThunk(
  "@@auth/fetchSession",
  async (loginData, { extra, rejectWithValue, dispatch }) => {
    try {
      const token = await extra.getAuthToken();
      dispatch(setToken(token));
      loginData.request_token = token.request_token;
      const reqOptions = {
        bodyData: loginData,
        httpMethod: "POST",
      };
      const { validateLogin } = await extra.validateLogin(reqOptions);
      if (validateLogin) return extra.createSession(reqOptions);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "@@auth/fetchUser",
  async (session_id, { extra, rejectWithValue }) => {
    try {
      return extra.getAccountDetails(session_id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "@@auth",
  initialState: {
    error: null,
    loading: "idle",
    user: null,
    session_id: null,
    isAuthorize: false,
    token: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.session_id = action.payload.session_id;
        state.isAuthorize = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload;
        state.isAuthorize = true;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("@@auth/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = "pending";
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("@@auth/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const { setToken } = authSlice.actions;

export const authReducer = authSlice.reducer;
