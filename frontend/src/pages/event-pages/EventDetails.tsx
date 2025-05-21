import { MdOutlineDateRange } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlInfo } from "react-icons/sl";
import EventParticipants from "../../components/event-components/EventParticipants";
import { smoothOpacity } from "../../lib/page-animations";
import { BASE_URL, DEFAULT_BG_IMG } from "../../lib/data";
import { useGetEvents } from "../../hooks/useGetEvents";
import { EventDetailsSkeleton } from "../../components/skeletons/EventDetailsSkeleton";
import { useJoinEvent } from "../../hooks/useJoinEvent";
import { useCancelEvent } from "../../hooks/useCancelEvent";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function EventDetails() {
	const { id } = useParams();
	const { formatDate } = useGetEvents();
	const { joinEvent, isJoining, token, isJoined } = useJoinEvent(id);
	const { cancelEvent, isCanceling } = useCancelEvent(id);

	const { data, isLoading } = useQuery({
		queryKey: ["event", id],
		queryFn: async () => {
			const res = await axios.get(`${BASE_URL}/events/${id}`);
			return res.data;
		},
		enabled: !!id,
	});

	if (isLoading) return <EventDetailsSkeleton />;

	return (
		<motion.section
			initial="initial"
			animate="animate"
			variants={smoothOpacity}
			className="flex flex-col md:flex-row items-center sm:items-start justify-center gap-5 max-w-[1350px] mx-auto mt-5 sm:mt-9 pb-10 px-2 xl:px-0"
		>
			<div className="flex-3 rounded-md sm:p-5 w-full bg-[#10141E]">
				<div className="relative overflow-hidden border rounded-md">
					<img src={DEFAULT_BG_IMG} alt="background img" className="w-full h-[30vh] sm:h-[44vh] object-cover" />
					<div className="flex flex-col gap-y-1 absolute bottom-0 p-4 w-full h-[30vh] sm:h-[44vh] bg-black/75">
						<span className="font-medium text-[24px]">{data.data.eventTitle}</span>
						<span className="flex gap-x-2 text-[18px] items-center">
							{formatDate(data?.data.eventDate)}, at {data?.data.eventTime}
						</span>
						<span>
							Organised by{" "}
							<Link to={`/profile/user/${data?.data.user._id}`} className="font-semibold text-sky-300">
								{data?.data.user.name || "Unkown"}
							</Link>
						</span>
					</div>
				</div>

				<div className="flex flex-col items-start gap-y-3 mt-5 p-3 rounded-sm border bg-[#1C2029]">
					<div className="flex items-center gap-x-4 border-b pb-2">
						<span>
							<SlInfo className="size-5" />
						</span>
						{data?.data.eventDescription}
					</div>

					<div className="flex items-center gap-x-4 border-b pb-3 w-full">
						<MdOutlineDateRange className="size-5" />
						{formatDate(data?.data.eventDate)}, at {data?.data.eventTime}
					</div>

					<div className="flex items-center gap-x-4 border-b pb-3 w-full">
						<TfiLocationPin className="size-5" />
						{data?.data.eventCity}, {data?.data.eventAvenue}
					</div>

					{isJoined ? (
						<button onClick={() => cancelEvent()} className="cursor-pointer rounded-md font-semibold border-1 border-sky-300 text-sky-300 py-2 px-4">
							{isCanceling ? "Canceling..." : "Cancel My Place"}
						</button>
					) : (
						<button onClick={() => joinEvent()} className="btn py-2 px-4">
							{token ? (isJoining ? "Joining..." : "Join This Event") : "Sign in to join this event"}
						</button>
					)}
				</div>
			</div>

			<EventParticipants participants={data?.data.eventParticipants} />
		</motion.section>
	);
}
