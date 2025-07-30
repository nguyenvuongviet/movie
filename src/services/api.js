import axios from "axios";

const api = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
});

api.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOT0RFSlMgNTAiLCJIZXRIYW5TdHJpbmciOiIxMC8xMC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NjAwNTQ0MDAwMDAiLCJuYmYiOjE3NDA4NzM2MDAsImV4cCI6MTc2MDIyNzIwMH0.mMbbQrfpocDbm-PEesfDTdZug1iAejOCCrKEFpq4pr8",
  };

  const accessToken = JSON.parse(
    localStorage.getItem("userInfoAdmin")
  )?.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default api;
