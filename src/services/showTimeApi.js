import api from "./api";

export const showTimeApi = {
  getTheaterSystems: () => api.get("/QuanLyRap/LayThongTinHeThongRap"),

  getTheaterClusters: (theaterSystemId) =>
    api.get(
      `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${theaterSystemId}`
    ),

  createShowTime: (data) => api.post("/QuanLyDatVe/TaoLichChieu", data),
};
