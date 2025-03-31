// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../../services/api";

// export const listBanner = createAsyncThunk(
//   "carousel/listBanner",
//   async (__dirname, { rejectWithValue }) => {
//     try {
//       const result = await api.get("/QuanLyPhim/LayDanhSachBanner");
//       return result.data.content;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// const initialState = {
//   loading: false,
//   data: null,
//   error: null,
// };

// const listImgBanner = createSlice({
//   name: "listImgBanner",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(listBanner.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(listBanner.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(listBanner.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default listImgBanner.reducer;
