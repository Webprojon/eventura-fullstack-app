import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const ProtectedAuthRoute = ({ children }: { children: React.ReactNode }) => {
	const { token } = useAuthStore();

	if (token) {
		return <Navigate to="/events" replace />;
	}
	return <>{children}</>;
};
