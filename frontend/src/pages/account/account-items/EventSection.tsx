import { useState } from "react";
import { EVENT_SECTION_LINKS } from "../../../lib/data";
import { MdOutlineDateRange } from "react-icons/md";
import Heading from "./Heading";
import { useGetEvents } from "../../../hooks/useGetEvents";
import { useUser } from "../../../hooks/useUser";
import EventSectionCards from "./EventSectionCards";

export default function EventSection() {
	const { user } = useUser();
	const { data } = useGetEvents();
	const [activeTab, setActiveTab] = useState("future-events");

	const myEvents = data?.data.filter((event) => event.user._id === user._id);
	const futureEvents = data?.data.filter((event) => event.eventParticipants.some((participant) => participant._id === user._id));

	return (
		<>
			<Heading icon={MdOutlineDateRange} text="Events" />
			<ul className="flex gap-x-6 text-slate-300 border-b my-3">
				{EVENT_SECTION_LINKS.map(({ id, tab, linkName }) => (
					<li onClick={() => setActiveTab(tab)} key={id} className={`text-sm pb-2 cursor-pointer ${activeTab === tab ? "border-b-1 text-white" : ""}`}>
						{linkName}
					</li>
				))}
			</ul>
			<div className={`${activeTab === "future-events" ? "block" : activeTab === "your-events" ? "block" : "flex"} justify-center items-center sm:h-[20vh]`}>
				{activeTab === "future-events" && <EventSectionCards events={futureEvents} />}
				{activeTab === "past-events" && <span>No events</span>}
				{activeTab === "your-events" && <EventSectionCards events={myEvents} />}
			</div>
		</>
	);
}
