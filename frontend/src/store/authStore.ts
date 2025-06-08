import axios from "axios";
import { create } from "zustand";
import { BASE_URL } from "../lib/data";

interface AuthState {
	token: string | null;
	setToken: (token: string | null) => void;
	refreshToken: () => Promise<void>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
	token: null,

	setToken: (token) => set({ token }),

	refreshToken: async () => {
		const refreshToken = localStorage.getItem("refreshToken");
		if (!refreshToken) {
			set({ token: null });
			return;
		}

		try {
			const res = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
			const newAccessToken = res.data.accessToken;
			const newRefreshToken = res.data.refreshToken;

			set({ token: newAccessToken });
			localStorage.setItem("refreshToken", newRefreshToken);
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error("Refresh token error:", err.message);
			}
			localStorage.removeItem("refreshToken");
			set({ token: null });
		}
	},

	logout: async () => {
		localStorage.removeItem("refreshToken");
		set({ token: null });
	},
}));
