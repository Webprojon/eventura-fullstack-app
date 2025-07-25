import { Link } from "react-router-dom";
import { EventTypes } from "../../../../lib/types";
import { useGetEvents } from "../../../../hooks/useGetEvents";
import Loader from "../../../../components/Loader";
import { DEFAULT_BG_IMG } from "../../../../lib/data";

export default function EventSectionCards({ events }: { events?: EventTypes[] }) {
	const { formatDate, isLoading } = useGetEvents();

	return (
		<div className="flex gap-x-4">
			{events?.length === 0 && <div className="h-34 w-full flex items-center justify-center">No Events</div>}
			{isLoading && (
				<div className="h-34 w-full flex items-center justify-center">
					<Loader className="w-8 h-8" />
				</div>
			)}

			{events?.map(({ _id, eventTitle, eventDate, eventTime }) => (
				<Link to={`/events/${_id}`} key={_id} className="w-32 border rounded-md cursor-pointer">
					<img src={DEFAULT_BG_IMG} alt="event img" />
					<div className="flex flex-col gap-y-1 bg-[#1C2029] text-slate-300 text-xs p-1">
						<span className="text-sm">{eventTitle.length > 10 ? eventTitle.substring(0, 12) + "..." : eventTitle}</span>
						<span>{formatDate(eventDate)}</span>
						<span>{eventTime}</span>
					</div>
				</Link>
			))}
		</div>
	);
}
