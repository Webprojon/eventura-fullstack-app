import { motion } from "framer-motion";
import { smoothOpacity } from "../lib/page-animations";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL, DEFAULT_BG_IMG, NO_AVATAR } from "../lib/data";
import { useGetEvents } from "../hooks/useGetEvents";
import { useFollow } from "../hooks/useFollow";

export default function UserProfile() {
	const { id } = useParams();
	const { formatDate, events } = useGetEvents();

	const { data, isLoading } = useQuery({
		queryKey: ["user", id],
		enabled: !!id,
		queryFn: async () => {
			const res = await axios.get(`${BASE_URL}/users/user/${id}`);
			return res.data;
		},
	});
	const user = data?.data;
	const userEvents = events?.filter((event) => event.user?._id === user?._id);
	const { followUser, unfollowUser } = useFollow("follower", user?._id);

	if (isLoading) {
		return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
	}

	return (
		<motion.section
			initial="initial"
			animate="animate"
			variants={smoothOpacity}
			className="flex items-start flex-col sm:flex-row gap-6 mt-5 sm:mt-9 max-w-[1350px] mx-auto pb-10 px-2 xl:px-0 select-none"
		>
			<div className="flex w-full sm:flex-[1] items-center flex-col gap-2 p-3 sm:p-4 rounded-md border text-slate-200 bg-[#10141E]">
				<img src={user.userImg || NO_AVATAR} alt="user img" className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full border object-cover" />
				<span className="sm:text-xl">{user.name}</span>
				<span className="text-[13px] mt-3">Member since: {formatDate(user.createdAt)}</span>
				<span className="text-[13px]">
					<strong>Contact: </strong>
					{user.email}
				</span>
				<div className="font-extralight cursor-pointer text-sky-300 mt-3">
					<button className="cursor-pointer mr-4">{0} Followers</button>
					<button onClick={() => followUser.mutate()} className="cursor-pointer">
						Follow
					</button>
					<button onClick={() => unfollowUser.mutate()} className="cursor-pointer">
						Unfollow
					</button>
				</div>
			</div>

			<div className="w-full flex-[3] p-3 sm:p-4 rounded-md border text-slate-300 bg-[#10141E]">
				<h1 className="font-medium tracking-wider">{user.name}'s Events</h1>
				<div className="flex flex-wrap gap-6 mt-4">
					{userEvents?.map(({ _id, eventTitle, eventDate, eventTime }) => (
						<Link to={`/events/${_id}`} key={_id} className="w-[10.4rem] sm:w-[9rem] border overflow-hidden rounded-md cursor-pointer">
							<img src={DEFAULT_BG_IMG} alt="event img" />
							<div className="flex flex-col gap-y-1 bg-[#1C2029] text-[14px] p-1">
								<span className="text-[14px]">{eventTitle}</span>
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
