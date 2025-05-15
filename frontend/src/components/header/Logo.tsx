import { FaPeopleGroup } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

export default function LogoSection() {
	const pathname = useLocation().pathname;

	return (
		<div className="flex items-center gap-x-4 text-lg">
			<Link to="/" className="flex items-center leading-none gap-3">
				<FaPeopleGroup className="size-8 text-sky-300" />
				<h1 className="leading-none font-semibold hidden sm:block">Eventura</h1>
			</Link>
			<Link to="/events" className={`font-semibold ${pathname === "/events" && "text-sky-300"}`}>
				Events
			</Link>
		</div>
	);
}
