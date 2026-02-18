import axios from "axios";

// Backend base URL change pannunga:
// ex: http://localhost:8000
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  timeout: 20000,
});
