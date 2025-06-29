import { Toaster } from "react-hot-toast";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import EventsPage from "./pages/event-pages/EventsPage";
import EventDetails from "./pages/event-pages/EventDetails";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import CreateEvent from "./pages/event-pages/CreateEvent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UpdateEvent from "./pages/event-pages/UpdateEvent";
import { ProtectedAuthRoute } from "./components/ProtectedAuthRoute";
import MyAccount from "./pages/account/MyAccount";
import StarterPage from "./pages/Starter";
import UserProfile from "./pages/UserProfile";
import Footer from "./components/Footer";

function App() {
	const pathname = useLocation().pathname;
	const queryClient = new QueryClient();
	const protectedRoutes = [
		{ path: "/", element: <StarterPage /> },
		{ path: "/sign-in", element: <Login /> },
		{ path: "/sign-up", element: <Register /> },
	];
	const hideNavbarRoutes = ["/", "/sign-in", "/sign-up"];
	const showFooterRoutes = ["/events"];

	return (
		<QueryClientProvider client={queryClient}>
			<main className="bg-primary-dark min-h-screen tracking-wide">
				{!hideNavbarRoutes.includes(pathname) && <Navbar />}
				<Routes>
					<Route path="/events" element={<EventsPage />} />
					<Route path="/events/:eventId" element={<EventDetails />} />
					<Route path="/events/create-event" element={<CreateEvent />} />
					<Route path="/events/update/:id" element={<UpdateEvent />} />
					<Route path="/account/me" element={<MyAccount />} />
					<Route path="/profile/user/:id" element={<UserProfile />} />
					{protectedRoutes.map(({ path, element }) => (
						<Route path={path} element={<ProtectedAuthRoute>{element}</ProtectedAuthRoute>} />
					))}
				</Routes>
				{showFooterRoutes.includes(pathname) && <Footer />}
				<Toaster position="bottom-right" />
				<div className="bg-opacity top-[-33rem]"></div>
				<div className="bg-opacity bottom-[-34rem]"></div>
			</main>
		</QueryClientProvider>
	);
}

export default App;
