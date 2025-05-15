import { Navigate } from "react-router-dom";

export const ProtectedAuthRoute = ({ children }: { children: React.ReactNode }) => {
	const token = localStorage.getItem("token");
	if (token) {
		return <Navigate to="/events" replace />;
	}
	return <>{children}</>;
};
