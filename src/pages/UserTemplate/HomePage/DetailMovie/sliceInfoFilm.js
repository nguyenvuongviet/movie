import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDetailMovie = createAsyncThunk(
  "detailMovie/fetchDetailMovie",
  async (id) => {
    try {
      const result = await axios({
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
        method: "GET",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOT0RFSlMgNTAiLCJIZXRIYW5TdHJpbmciOiIxMC8xMC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NjAwNTQ0MDAwMDAiLCJuYmYiOjE3NDA4NzM2MDAsImV4cCI6MTc2MDIyNzIwMH0.mMbbQrfpocDbm-PEesfDTdZug1iAejOCCrKEFpq4pr8",
        },
      });
      return result.data.content;
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const detailMoviePageSlice = createSlice({
  name: "detailMoviePageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDetailMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDetailMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default detailMoviePageSlice.reducer;
