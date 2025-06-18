import axios from "axios";

axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? "",
  responseType: 'json',
  // headers: ""
});

const axiosInstance = axios;
export default axiosInstance;
