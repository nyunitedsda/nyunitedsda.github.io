import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

// Extend InternalAxiosRequestConfig to allow _retry property
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? "",
	responseType: "json",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	withCredentials: true,
});

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		const originalRequest = error.config as
			| CustomAxiosRequestConfig
			| undefined;

		// Handle CORS and other errors
		if (error.response && error.response.status === 403) {
			console.error("CORS issue or forbidden access");
		}

		// Handle unauthorized (401) - optionally redirect to login
		if (
			typeof window !== "undefined" &&
			error.response &&
			error.response.status === 401 &&
			originalRequest &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			// Optionally redirect to login or show a message
			window.location.href = "/login";
		}

		return Promise.reject(error);
	},
);

export default axiosInstance;
