import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieApi } from "../../../../services/movieApi";

export const fetchMovieInfo = createAsyncThunk(
  "movie/fetchMovieInfo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await movieApi.getMovieInfo(id);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.content || "Lỗi khi lấy thông tin phim"
      );
    }
  }
);

export const createMovie = createAsyncThunk(
  "movie/createMovie",
  async (formData, { rejectWithValue }) => {
    try {
      await movieApi.createMovie(formData);
      return "Thêm phim thành công";
    } catch (error) {
      return rejectWithValue(
        error.response?.data.content || "Lỗi khi thêm phim"
      );
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movie/updateMovie",
  async (formData, { rejectWithValue }) => {
    try {
      await movieApi.updateMovie(formData);
      return "Cập nhật phim thành công";
    } catch (error) {
      return rejectWithValue(
        error.response?.data.content || "Lỗi khi cập nhật phim"
      );
    }
  }
);

const initialState = {
  movieInfo: null,
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    resetMovieInfo: (state) => {
      state.movieInfo = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.movieInfo = action.payload;
      })
      .addCase(fetchMovieInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMovieInfo } = movieSlice.actions;
export default movieSlice.reducer;
