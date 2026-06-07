import axios from "axios";
import { API_URL } from "../config/api";

// ---------------------------------------------------------------------------
// Axios instance
// ---------------------------------------------------------------------------
const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 30000, // 30 s — generous for file-upload + AI processing
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ---------------------------------------------------------------------------
// Request interceptor
// Attach auth tokens or any global headers here in the future.
// ---------------------------------------------------------------------------
api.interceptors.request.use(
  (config) => {
    // Example: inject Bearer token when auth is added
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------------------------------------------------------------------
// Response interceptor
// Normalise errors so callers always receive a consistent shape.
// ---------------------------------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (!response) {
      // Network error or server is completely unreachable
      return Promise.reject(
        new Error("Network error — please check your connection and try again.")
      );
    }

    // Extract a human-readable message from the server payload, if present
    const serverMessage =
      response.data?.message ||
      response.data?.error ||
      `Request failed with status ${response.status}`;

    // Augment the original error so callers still have access to `response`
    error.message = serverMessage;
    return Promise.reject(error);
  }
);

export default api;
