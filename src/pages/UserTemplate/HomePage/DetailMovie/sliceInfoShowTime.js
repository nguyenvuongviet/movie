import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchShowTimeInfo = createAsyncThunk(
  "detailMovie/fetchShowTimeInfo",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.get(
        `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`
      );
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

const detailInfoShowTimeSlice = createSlice({
  name: "detailInfoShowTimeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowTimeInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShowTimeInfo.fulfilled, (state, action) => {
        (state.loading = false), (state.data = action.payload);
      })
      .addCase(fetchShowTimeInfo.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export default detailInfoShowTimeSlice.reducer;
