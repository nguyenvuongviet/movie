import api from "./api";

export const userApi = {
  getUserList: () =>
    api.get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP08"),

  getUserInfo: (id) =>
    api.post(`/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${id}`),

  createUser: (userData) =>
    api.post("/QuanLyNguoiDung/ThemNguoiDung", userData),

  updateUser: (userData) =>
    api.post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", userData),

  deleteUser: (id) =>
    api.delete(`QuanLyNguoiDung/XoaNguoiDung/?TaiKhoan=${id}`),
};
