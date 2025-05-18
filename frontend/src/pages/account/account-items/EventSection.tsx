import { useState } from "react";
import { DEFAULT_BG_IMG } from "../../../lib/data";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router-dom";
import Heading from "./Heading";

// Temporary static data
const LINKS = [
	{
		id: 1,
		tab: "future-events",
		linkName: "Future Events",
	},
	{
		id: 2,
		tab: "past-events",
		linkName: "Past Events",
	},
	{
		id: 3,
		tab: "your-events",
		linkName: "Your Events",
	},
];
const EVENTS = [
	{
		id: 1,
		title: "Business Plan",
		date: "07 May 2025",
		time: "14:00",
		image: DEFAULT_BG_IMG,
	},
	{
		id: 2,
		title: "GYM Workout",
		date: "06 May 2025",
		time: "17:00",
		image: DEFAULT_BG_IMG,
	},
];

export default function EventSection() {
	const [activeTab, setActiveTab] = useState("future-events");

	return (
		<>
			<Heading icon={MdOutlineDateRange} text="Events" />
			<ul className="flex gap-x-6 text-slate-300 border-b mt-6 mb-4">
				{LINKS.map(({ id, tab, linkName }) => (
					<li onClick={() => setActiveTab(tab)} key={id} className={`text-sm pb-2 cursor-pointer ${activeTab === tab ? "border-b-1 text-white" : ""}`}>
						{linkName}
					</li>
				))}
			</ul>
			<div className={`${activeTab === "future-events" ? "block" : "flex"} justify-center items-center sm:h-[20vh]`}>
				{activeTab === "future-events" && (
					<div className="flex gap-x-4">
						{EVENTS.map(({ id, title, date, time, image }) => (
							<div key={id} className="w-[120px] border rounded-md cursor-pointer">
								<img src={image} alt="event img" className="" />
								<Link to="/events" className="flex flex-col gap-y-[2px] bg-[#1C2029] text-slate-300 text-[12px] p-1">
									<span className="text-[13px]">{title}</span>
									<span>{date}</span>
									<span>{time}</span>
								</Link>
							</div>
						))}
					</div>
				)}
				{activeTab === "past-events" && <span>No events</span>}
				{activeTab === "your-events" && <span>No events</span>}
			</div>
		</>
	);
}
