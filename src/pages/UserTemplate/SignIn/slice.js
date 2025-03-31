import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const actLogin = createAsyncThunk(
  "singIn/actLogin",
  async (user, { rejectWithValue }) => {
    try {
      const result = await api.post("/QuanLyNguoiDung/DangNhap", user);
      const userInfo = result.data.content;
      // Save userInfo to local storage
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loading: false,
  data: userInfo,
  error: null,
};

const signInSlice = createSlice({
  name: "signInSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(actLogin.fulfilled, (state, action) => {
        (state.loading = false), (state.data = action.payload);
      })
      .addCase(actLogin.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export default signInSlice.reducer;
