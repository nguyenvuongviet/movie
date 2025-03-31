import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showTimeApi } from "../../../../services/showTimeApi";

export const fetchTheaterSystem = createAsyncThunk(
  "showTime/fetchTheaterSystem",
  async (_, { rejectWithValue }) => {
    try {
      const result = await showTimeApi.getTheaterSystems();
      return result.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi hệ thống rạp"
      );
    }
  }
);

export const fetchTheaterCluster = createAsyncThunk(
  "showTime/fetchTheaterCluster",
  async (theaterSystemId, { rejectWithValue }) => {
    try {
      const result = await showTimeApi.getTheaterClusters(theaterSystemId);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Lỗi cụm rạp");
    }
  }
);

export const createShowTime = createAsyncThunk(
  "showTime/createShowTime",
  async (showTime, { rejectWithValue }) => {
    try {
      await showTimeApi.createShowTime(showTime);
      return "Thêm lịch thành công";
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tạo lịch chiếu"
      );
    }
  }
);

const initialState = {
  theaterSystems: [],
  theaterClusters: [],
  loading: false,
  error: null,
  successMessage: null,
};

const showTimeSlice = createSlice({
  name: "showTime",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTheaterSystem.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTheaterSystem.fulfilled, (state, action) => {
        state.loading = false;
        state.theaterSystems = action.payload;
      })
      .addCase(fetchTheaterSystem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTheaterCluster.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTheaterCluster.fulfilled, (state, action) => {
        state.loading = false;
        state.theaterClusters = action.payload;
      })
      .addCase(fetchTheaterCluster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createShowTime.pending, (state) => {
        state.loading = true;
      })
      .addCase(createShowTime.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(createShowTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = showTimeSlice.actions;
export default showTimeSlice.reducer;
