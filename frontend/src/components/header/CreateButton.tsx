import { MdEditCalendar } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

export default function CreateButton() {
	const pathname = useLocation().pathname;
	const { linkTo } = useUser();
	const checkLink = pathname === "/events/create-event" ? "hidden" : "sm:block";

	return (
		<>
			<Link to={linkTo} className={`hidden py-[4px] px-4 btn ${checkLink}`}>
				Create New Event
			</Link>
			<Link to={linkTo} className={checkLink}>
				<MdEditCalendar className="sm:hidden size-7 text-slate-300" />
			</Link>
		</>
	);
}
