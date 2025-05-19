import { Link } from "react-router-dom";
import { useGetEvents } from "../../../hooks/useGetEvents";
import { DEFAULT_BG_IMG } from "../../../lib/data";
import { EventTypes } from "../../../lib/types";

export default function EventSectionCards({ events }: { events?: EventTypes[] }) {
	const { formatDate } = useGetEvents();

	return (
		<div className="flex gap-x-4">
			{events?.map(({ _id, eventTitle, eventDate, eventTime }) => (
				<Link to={`/events/${_id}`} key={_id} className="w-[120px] border rounded-md cursor-pointer">
					<img src={DEFAULT_BG_IMG} alt="event img" />
					<div className="flex flex-col gap-y-[2px] bg-[#1C2029] text-slate-300 text-[12px] p-1">
						<span className="text-[13px]">{eventTitle}</span>
						<span>{formatDate(eventDate)}</span>
						<span>{eventTime}</span>
					</div>
				</Link>
			))}
		</div>
	);
}
