import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../../../services/userApi";

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await userApi.getUserInfo(id);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Lỗi khi lấy thông tin người dùng"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      await userApi.updateUser(userData);
      return "Cập nhật thành công";
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.content || "Lỗi khi cập nhật người dùng"
      );
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      await userApi.createUser(userData);
      return "Thêm người dùng thành công";
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.content || "Lỗi khi thêm người dùng"
      );
    }
  }
);

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserInfo: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUserInfo } = userSlice.actions;
export default userSlice.reducer;
