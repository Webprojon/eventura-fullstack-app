import { Link } from "react-router-dom";
import Loader from "../Loader";
import LogoSection from "./Logo";
import CreateButton from "./CreateButton";
import Dropdown from "./Dropdown";
import { useUserData } from "../../hooks/useUserData";

export default function Navbar() {
	const { token, isLoading } = useUserData();

	return (
		<header className="max-w-[1350px] mx-auto flex items-center justify-between h-[9vh] border-b px-2 xl:px-0 select-none">
			<LogoSection />
			<nav className="font-semibold flex items-center gap-x-5 sm:gap-x-3">
				<CreateButton />
				{token ? (
					<>{isLoading ? <Loader className="w-9 h-9" /> : <Dropdown />}</>
				) : (
					<Link to="/sign-in" className="py-[7px] sm:py-[4px] px-5 btn relative flex justify-center items-center">
						<span className="relative -top-4 -left-6 flex size-3">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-85"></span>
							<span className="relative inline-flex size-3 rounded-full bg-sky-400"></span>
						</span>
						Sign In
					</Link>
				)}
			</nav>
		</header>
	);
}
