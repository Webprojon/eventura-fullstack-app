// axiosInstance.ts
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const instance = axios.create({
	baseURL: "http://localhost:5500/api/v1",
	withCredentials: true,
});

instance.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().token;
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

instance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				await useAuthStore.getState().refreshToken();

				const newToken = useAuthStore.getState().token;

				if (newToken) {
					originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
					return instance(originalRequest);
				}
			} catch (err) {
				console.log(err);
				useAuthStore.getState().logout();
			}
		}

		return Promise.reject(error);
	},
);

export default instance;
