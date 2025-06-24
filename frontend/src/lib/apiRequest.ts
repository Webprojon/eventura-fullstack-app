import axios from "axios";

export const apiRequest = axios.create({
	baseURL: "https://eventura-data.onrender.com/api/v1",
	withCredentials: true,
});
