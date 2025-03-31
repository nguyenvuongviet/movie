import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieApi } from "../../../services/movieApi";

export const fetchMovieList = createAsyncThunk(
  "listMovie/fetchMovieList",
  async (__dirname, { rejectWithValue }) => {
    try {
      const result = await movieApi.getMovieList();
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movie/deleteMovie",
  async (id, { rejectWithValue }) => {
    try {
      await movieApi.deleteMovie(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.content || "Lỗi khi xóa phim"
      );
    }
  }
);

const initialState = {
  movies: null,
  loading: false,
  error: null,
};

const listMovieSlice = createSlice({
  name: "listMovie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieList.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovieList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(
          (movie) => movie.maPhim !== action.payload
        );
      });
  },
});

export default listMovieSlice.reducer;
