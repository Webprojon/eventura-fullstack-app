import { useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { useGetEvents } from "../../../../hooks/useGetEvents";
import Heading from "../Heading";
import { EVENT_SECTION_LINKS } from "../../../../lib/data";
import EventSectionCards from "./EventSectionCards";
import { useUserData } from "../../../../hooks/useUserData";

export default function EventSection() {
	const { events } = useGetEvents();
	const { accountOwner } = useUserData();
	const [activeTab, setActiveTab] = useState("future-events");

	const today = new Date();
	const futureEvents = events?.filter((event) => event.eventParticipants.some((participant) => participant._id === accountOwner?._id));
	const ownerEvents = events?.filter((event) => event.user?._id === accountOwner?._id);
	const pastEvents = ownerEvents?.filter((event) => new Date(event.eventDate) < new Date(today));

	return (
		<>
			<Heading icon={MdOutlineDateRange} text="Events" />
			<ul className="flex gap-x-6 text-slate-300 border-b my-4 sm:my-3">
				{EVENT_SECTION_LINKS.map(({ id, tab, linkName }) => (
					<li onClick={() => setActiveTab(tab)} key={id} className={`text-sm pb-2 cursor-pointer ${activeTab === tab && "border-b-1 text-white"}`}>
						{linkName}
					</li>
				))}
			</ul>
			<>
				{activeTab === "future-events" && <EventSectionCards events={futureEvents} />}
				{activeTab === "past-events" && <EventSectionCards events={pastEvents} />}
				{activeTab === "your-events" && <EventSectionCards events={ownerEvents} />}
			</>
		</>
	);
}
