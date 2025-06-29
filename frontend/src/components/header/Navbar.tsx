import { Link } from "react-router-dom";
import Loader from "../Loader";
import LogoSection from "./Logo";
import CreateButton from "./CreateButton";
import Dropdown from "./Dropdown";
import { useUserData } from "../../hooks/useUserData";

export default function Navbar() {
	const { isLoading } = useUserData();
	const { accountOwner } = useUserData();

	return (
		<header className="container flex items-center justify-between h-16 border-b px-2 xl:px-0">
			<LogoSection />
			<nav className="font-semibold flex items-center gap-x-5 sm:gap-x-3">
				<CreateButton />
				{accountOwner ? (
					<>{isLoading ? <Loader className="w-9 h-9" /> : <Dropdown />}</>
				) : (
					<Link to="/sign-in" className="btn py-2 sm:py-1 px-5 relative flex justify-center items-center">
						<span className="relative -top-4 -left-6 flex size-3">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-80"></span>
							<span className="relative inline-flex size-3 rounded-full bg-sky-400"></span>
						</span>
						Sign In
					</Link>
				)}
			</nav>
		</header>
	);
}
