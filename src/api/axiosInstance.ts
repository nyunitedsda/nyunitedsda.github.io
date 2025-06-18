import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? "",
	responseType: "json",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Interceptor for handling errors
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		// Handle CORS and other errors
		if (error.response && error.response.status === 403) {
			console.error("CORS issue or forbidden access");
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
