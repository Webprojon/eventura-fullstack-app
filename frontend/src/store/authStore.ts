import axios from "axios";
import { create } from "zustand";

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
		try {
			const res = await axios.post("http://localhost:5500/api/v1/auth/refresh", {}, { withCredentials: true });
			const newAccessToken = res.data.accessToken;
			set({ token: newAccessToken });
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error("Refresh token error:", err.message);
			}
			set({ token: null });
		}
	},

	logout: async () => {
		try {
			await axios.post("http://localhost:5500/api/v1/auth/sign-out", {}, { withCredentials: true });
		} finally {
			set({ token: null });
		}
	},
}));
