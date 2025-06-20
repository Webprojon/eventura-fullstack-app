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
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

function App() {
	const pathname = useLocation().pathname;
	const queryClient = new QueryClient();
	const { refreshToken } = useAuthStore();

	useEffect(() => {
		refreshToken();
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<main className="bg-[#030712] min-h-[100vh] tracking-wide text-slate-100">
				{!(pathname === "/" || pathname === "/sign-in" || pathname === "/sign-up") && <Navbar />}
				<Routes>
					<Route path="/events" element={<EventsPage />} />
					<Route path="/events/:eventId" element={<EventDetails />} />
					<Route path="/events/create-event" element={<CreateEvent />} />
					<Route path="/events/update/:id" element={<UpdateEvent />} />
					<Route path="/account/me" element={<MyAccount />} />
					<Route path="/profile/user/:id" element={<UserProfile />} />
					<Route
						path="/"
						element={
							<ProtectedAuthRoute>
								<StarterPage />
							</ProtectedAuthRoute>
						}
					/>
					<Route
						path="/sign-in"
						element={
							<ProtectedAuthRoute>
								<Login />
							</ProtectedAuthRoute>
						}
					/>
					<Route
						path="/sign-up"
						element={
							<ProtectedAuthRoute>
								<Register />
							</ProtectedAuthRoute>
						}
					/>
				</Routes>
				{pathname === "/events" && <Footer />}
				<Toaster position="bottom-right" />
				<div className="fixed z-10 left-1/2 top-[-33rem] -translate-x-1/2 h-[30rem] w-[40rem] rounded-full blur-[10rem] bg-[#2a3f83]"></div>
				<div className="fixed z-10 left-1/2 bottom-[-34rem] -translate-x-1/2 h-[30rem] w-[40rem] rounded-full blur-[10rem] bg-[#2a3f83]"></div>
			</main>
		</QueryClientProvider>
	);
}

export default App;
