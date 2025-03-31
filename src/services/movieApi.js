import api from "./api";

export const movieApi = {
  getMovieList: () => api.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01"),

  getMovieInfo: (id) => api.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`),

  createMovie: (formData) =>
    api.post("/QuanLyPhim/ThemPhimUploadHinh", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateMovie: (formData) =>
    api.post("/QuanLyPhim/CapNhatPhimUpload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  deleteMovie: (id) => api.delete(`/QuanLyPhim/XoaPhim?MaPhim=${id}`),
};
