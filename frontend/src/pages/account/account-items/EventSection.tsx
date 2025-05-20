import { useState } from "react";
import { EVENT_SECTION_LINKS } from "../../../lib/data";
import { MdOutlineDateRange } from "react-icons/md";
import Heading from "./Heading";
import { useGetEvents } from "../../../hooks/useGetEvents";
import EventSectionCards from "./EventSectionCards";

export default function EventSection() {
	const { pastEvents, ownerEvents, futureEvents } = useGetEvents();
	const [activeTab, setActiveTab] = useState("future-events");

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
