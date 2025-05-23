import { MdEditCalendar } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useUserData } from "../../hooks/useUserData";

export default function CreateButton() {
	const { createEventOrSignInLink } = useUserData();
	const pathname = useLocation().pathname;
	const checkLink = pathname === "/events/create-event" ? "hidden" : "sm:block";

	return (
		<>
			<Link to={createEventOrSignInLink} className={`hidden py-[4px] px-4 btn ${checkLink}`}>
				Create New Event
			</Link>
			<Link to={createEventOrSignInLink} className={checkLink}>
				<MdEditCalendar className="sm:hidden size-7 text-slate-300" />
			</Link>
		</>
	);
}
