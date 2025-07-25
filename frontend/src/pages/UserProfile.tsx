import { motion } from "framer-motion";
import { smoothOpacity } from "../lib/page-animations";
import { Link } from "react-router-dom";
import { DEFAULT_BG_IMG, NO_AVATAR } from "../lib/data";
import { useGetEvents } from "../hooks/useGetEvents";
import { useFollow } from "../hooks/useFollow";
import { useUserData } from "../hooks/useUserData";
import { FollowType } from "../lib/types";

export default function UserProfile() {
	const { formatDate, events } = useGetEvents();
	const { accountOwner, userData, isloading } = useUserData();
	const { followUser, unfollowUser } = useFollow();

	const isFollowed = userData?.followers?.some((follower: FollowType) => follower._id === accountOwner?._id);
	const userEvents = events?.filter((event) => event.user?._id === userData?._id);

	if (isloading || !userData) {
		return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
	}

	return (
		<motion.section
			initial="initial"
			animate="animate"
			variants={smoothOpacity}
			className="container flex items-start flex-col sm:flex-row gap-6 mt-5 sm:mt-9 pb-10 px-2 xl:px-0"
		>
			<div className="flex w-full sm:flex-[1] items-center flex-col gap-2 p-3 sm:p-4 rounded-md border text-slate-200 bg-[#10141E]">
				<img src={userData.image || NO_AVATAR} alt="user img" className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border object-cover" />
				<span className="sm:text-xl">{userData.name}</span>
				<span className="text-xs mt-3">Member since: {formatDate(userData.createdAt)}</span>
				<span className="text-xs">
					<strong>Contact: </strong>
					{userData.email}
				</span>
				<div className="flex items-end gap-x-4 font-extralight text-sky-300 mt-3 select-none">
					<span>{userData?.followers?.length || 0} Followers</span>
					{followUser.isPending || unfollowUser.isPending ? (
						<span>Please wait...</span>
					) : isFollowed ? (
						<button onClick={() => unfollowUser.mutate(userData._id)} className="cursor-pointer">
							Unfollow
						</button>
					) : (
						<button onClick={() => followUser.mutate(userData._id)} className="cursor-pointer">
							Follow
						</button>
					)}
				</div>
			</div>

			<div className="w-full flex-[3] p-3 sm:p-4 rounded-md border text-slate-300 bg-[#10141E]">
				<h1 className="font-medium tracking-wider text-lg sm:text-xl">{userData.name}'s Events</h1>
				<div className="flex flex-wrap gap-6 mt-4">
					{userEvents?.length === 0 && <p className="text-slate-400">No events created yet.</p>}
					{userEvents?.map(({ _id, eventTitle, eventDate, eventTime }) => (
						<Link to={`/events/${_id}`} key={_id} className="w-42 sm:w-36 border overflow-hidden rounded-md cursor-pointer">
							<img src={DEFAULT_BG_IMG} alt="event img" />
							<div className="flex flex-col gap-y-2 bg-[#1C2029] text-sm p-1">
								<span className="text-sm">{eventTitle.length > 15 ? eventTitle.substring(0, 16) + "..." : eventTitle}</span>
								<span>{formatDate(eventDate)}</span>
								<span>{eventTime}</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</motion.section>
	);
}
