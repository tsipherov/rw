import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchSession = createAsyncThunk("@@auth/fetchSession", async () => {
  try {
    const response = await fetch(
      `${API_URL}/authentication/token/new`,
      reqOptions
    );
  } catch (error) {}
});
