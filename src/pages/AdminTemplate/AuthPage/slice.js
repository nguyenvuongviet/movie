import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

export const actLogin = createAsyncThunk(
  "auth/actLogin",
  async (user, { rejectWithValue }) => {
    try {
      const result = await api.post("/QuanLyNguoiDung/DangNhap", user);
      const userInfo = result.data.content;
      if (userInfo.maLoaiNguoiDung === "KhachHang") {
        return rejectWithValue({
          response: {
            data: {
              content: "Bạn không có quyền truy cập trang này",
            },
          },
        });
      }

      localStorage.setItem("userInfoAdmin", JSON.stringify(userInfo));

      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userInfo = localStorage.getItem("userInfoAdmin")
  ? JSON.parse(localStorage.getItem("userInfoAdmin"))
  : null;

const initialState = {
  loading: false,
  data: userInfo,
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userInfoAdmin");
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(actLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
