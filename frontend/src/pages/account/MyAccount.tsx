import { motion } from "framer-motion";
import { smoothOpacity } from "../../lib/page-animations";
import { useUser } from "../../hooks/useUser";
import { NO_AVATAR } from "../../lib/data";
import { useState } from "react";
import AboutSection from "./account-items/AboutSection";
import EventSection from "./account-items/EventSection";
import PhotoSection from "./account-items/PhotoSection";
import FollowerSection from "./account-items/FollowerSection";
import FollowingSection from "./account-items/FollowingSection";

const LINKS = [
	{
		id: 1,
		tab: "about",
		linkName: "About",
	},
	{
		id: 2,
		tab: "photos",
		linkName: "Photos",
	},
	{
		id: 3,
		tab: "event",
		linkName: "Event",
	},
	{
		id: 4,
		tab: "followers",
		linkName: "Followers",
	},
	{
		id: 5,
		tab: "following",
		linkName: "Following",
	},
];

export default function MyAccount() {
	const { user } = useUser();
	const [activeTab, setActiveTab] = useState("photos");

	if (!user) return <div className="h-[calc(100vh-9rem)] flex justify-center items-center text-xl">Loading...</div>;

	const handleActiveTab = (active: string) => {
		setActiveTab(active);
	};

	return (
		<motion.section
			initial="initial"
			animate="animate"
			variants={smoothOpacity}
			className="flex flex-col items-start gap-6 mt-5 select-none sm:mt-9 max-w-[1350px] min-h-[100vh] mx-auto pb-10 px-2 xl:px-0"
		>
			<div className="flex items-center justify-between w-full p-3 sm:p-5 rounded-md border bg-[#10141E]">
				<div className="flex items-center gap-x-5">
					<img src={user.img || NO_AVATAR} alt="user img" className="w-[60px] h-[60px] sm:w-[140px] sm:h-[140px] rounded-full border object-cover" />
					<span className="sm:text-xl">{user.name}</span>
				</div>
				<div className="flex items-center gap-x-6">
					<div className="flex flex-col items-center">
						<span className="sm:text-[30px]">0</span>
						<span className="text-sm sm:text-[18px] tracking-wider">Followers</span>
					</div>
					<div className="flex flex-col items-center">
						<span className="sm:text-[30px]">0</span>
						<span className="text-sm sm:text-[18px] tracking-wider">Following</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col-reverse sm:flex-row w-full gap-6">
				<div className="flex-[2.9] px-5 py-4 rounded-md border bg-[#10141E]">
					{activeTab === "about" && <AboutSection user={user} />}
					{activeTab === "photos" && <PhotoSection />}
					{activeTab === "event" && <EventSection />}
					{activeTab === "followers" && <FollowerSection />}
					{activeTab === "following" && <FollowingSection />}
				</div>
				<div className="flex-1 rounded-md">
					<ul className="flex sm:flex-col justify-between sm:gap-2">
						{LINKS.map(({ id, tab, linkName }) => (
							<li
								key={id}
								onClick={() => handleActiveTab(tab)}
								className={`rounded-md border cursor-pointer text-sm sm:text-md p-2 sm:p-3 hover:bg-[#1C2029] ${
									activeTab === tab ? "bg-[#1C2029]" : "bg-[#10141E]"
								}`}
							>
								{linkName}
							</li>
						))}
					</ul>
				</div>
			</div>
		</motion.section>
	);
}
