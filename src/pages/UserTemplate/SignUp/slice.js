import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const actSignUp = createAsyncThunk(
  "signUp/actSignUp",
  async (user, { rejectWithValue }) => {
    try {
      const result = await api.post("/QuanLyNguoiDung/DangKy", user);

      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actSignUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(actSignUp.fulfilled, (state, action) => {
        (state.loading = false), (state.data = action.payload);
      })
      .addCase(actSignUp.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export default signUpSlice.reducer;
