import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

// Extend InternalAxiosRequestConfig to allow _retry property
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

type ErrorDetail = { details?: Record<string, { msg: string }> };

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? "",
	responseType: "json",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		"x-powered-by": false,
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

		if (error.status === 400 && error.response?.data) {
			const { data } = error.response;

			const details = (data as ErrorDetail).details ?? {};

			const formikError = Object.fromEntries(
				Object.entries(details).map(([field, { msg }]) => [field, msg]),
			);

			return Promise.reject({ error, formikError });
		}

		// Handle CORS and other errors
		if (error.response && error.response.status === 403) {
			console.error("CORS issue or forbidden access");
		}

		if (
			typeof window !== "undefined" &&
			error.response &&
			error.response.status === 401 &&
			originalRequest &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			// Optionally redirect to login or show a message
		}

		return Promise.reject(error);
	},
);

export default axiosInstance;
