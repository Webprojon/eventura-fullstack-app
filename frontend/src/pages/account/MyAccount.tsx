import { motion } from "framer-motion";
import { smoothOpacity } from "../../lib/page-animations";
import { MY_ACCOUNT_LINKS, NO_AVATAR } from "../../lib/data";
import { useState } from "react";
import AboutSection from "./account-items/AboutSection";
import PhotoSection from "./account-items/PhotoSection";
import FollowerSection from "./account-items/follow-items/FollowerSection";
import FollowingSection from "./account-items/follow-items/FollowingSection";
import { useUserData } from "../../hooks/useUserData";
import EventSection from "./account-items/event-items/EventSection";

export default function MyAccount() {
	const { accountOwner } = useUserData();
	const [activeTab, setActiveTab] = useState("about");

	const toggleActiveTab = (active: string) => setActiveTab(active);

	if (!accountOwner) return <div className="h-[calc(100vh-9rem)] flex justify-center items-center text-xl">Loading...</div>;

	return (
		<motion.section
			initial="initial"
			animate="animate"
			variants={smoothOpacity}
			className="container flex flex-col items-start gap-6 mt-5 sm:mt-9 pb-10 px-2 xl:px-0"
		>
			<div className="flex flex-col sm:flex-row gap-y-6 items-center justify-between w-full p-3 sm:p-5 rounded-md border bg-primary">
				<div className="flex flex-col sm:flex-row items-center gap-4">
					<img src={accountOwner.image || NO_AVATAR} alt="user img" className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border object-cover" />
					<span className="sm:text-xl">{accountOwner.name}</span>
				</div>
				<div className="flex items-center gap-x-6">
					<div className="flex flex-col items-center">
						<span className="sm:text-2xl">{accountOwner.followers?.length || 0}</span>
						<span className="text-sm sm:text-lg tracking-wider">Followers</span>
					</div>
					<div className="flex flex-col items-center">
						<span className="sm:text-2xl">{accountOwner.following?.length || 0}</span>
						<span className="text-sm sm:text-lg tracking-wider">Following</span>
					</div>
				</div>
			</div>

			<div className="flex flex-col-reverse sm:flex-row w-full gap-6">
				<div className="flex-[2.9] p-3 sm:px-5 sm:py-4 rounded-md border bg-primary">
					{activeTab === "about" && <AboutSection />}
					{activeTab === "photos" && <PhotoSection />}
					{activeTab === "event" && <EventSection />}
					{activeTab === "followers" && <FollowerSection />}
					{activeTab === "following" && <FollowingSection />}
				</div>
				<div className="flex-1 rounded-md select-none">
					<ul className="flex sm:flex-col justify-between sm:gap-2">
						{MY_ACCOUNT_LINKS.map(({ id, tab, linkName }) => (
							<li
								key={id}
								onClick={() => toggleActiveTab(tab)}
								className={`rounded-md border cursor-pointer text-sm sm:text-md p-2 sm:p-3 ${activeTab === tab ? "bg-secondary" : "bg-primary"}`}
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
