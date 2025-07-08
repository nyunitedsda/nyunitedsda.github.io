import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? "",
	responseType: "json",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Request interceptor to add authentication token
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor for handling errors and token refresh
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// Handle CORS and other errors
		if (error.response && error.response.status === 403) {
			console.error("CORS issue or forbidden access");
		}

		// Handle token expiration and automatic refresh
		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;

			const refreshToken = localStorage.getItem("refreshToken");
			if (refreshToken) {
				try {
					// Try to refresh the token
					const response = await axios.post(
						`${axiosInstance.defaults.baseURL}/auth/refresh`,
						{
							refreshToken: refreshToken,
						},
					);

					const { accessToken, refreshToken: newRefreshToken } =
						response.data.data || response.data;

					// Update stored tokens
					localStorage.setItem("accessToken", accessToken);
					localStorage.setItem("refreshToken", newRefreshToken);

					// Update the original request with new token
					originalRequest.headers.Authorization = `Bearer ${accessToken}`;

					// Retry the original request
					return axiosInstance(originalRequest);
				} catch (refreshError) {
					// Refresh failed, clear tokens and redirect to login
					localStorage.removeItem("accessToken");
					localStorage.removeItem("refreshToken");

					// Optionally dispatch a logout action or redirect to login
					// This would depend on your routing setup
					console.error("Token refresh failed:", refreshError);

					// You might want to redirect to login page here
					// window.location.href = '/login';
				}
			} else {
				// No refresh token available
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
			}
		}

		return Promise.reject(error);
	},
);

export default axiosInstance;
