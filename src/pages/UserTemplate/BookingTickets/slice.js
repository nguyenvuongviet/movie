import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchMovieShowTimeInfo = createAsyncThunk(
  "bookingTickets/fetchMovieShowTimeInfo",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.get(
        `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`
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
      .addCase(fetchMovieShowTimeInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieShowTimeInfo.fulfilled, (state, action) => {
        (state.loading = false), (state.data = action.payload);
      })
      .addCase(fetchMovieShowTimeInfo.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export default detailInfoShowTimeSlice.reducer;
