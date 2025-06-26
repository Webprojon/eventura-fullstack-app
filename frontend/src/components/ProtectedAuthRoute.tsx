import { Navigate } from "react-router-dom";
import { useUserData } from "../hooks/useUserData";

export const ProtectedAuthRoute = ({ children }: { children: React.ReactNode }) => {
	const { accountOwner } = useUserData();

	if (accountOwner) {
		return <Navigate to="/events" replace />;
	}
	return <>{children}</>;
};
