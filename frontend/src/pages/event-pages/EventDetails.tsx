import { MdOutlineDateRange } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlInfo } from "react-icons/sl";
import EventParticipants from "../../components/event-components/EventParticipants";
import { smoothOpacity } from "../../lib/page-animations";
import { DEFAULT_BG_IMG } from "../../lib/data";
import { useGetEvents } from "../../hooks/useGetEvents";
import { EventDetailsSkeleton } from "../../components/skeletons/EventDetailsSkeleton";
import { useJoinEvent } from "../../hooks/useJoinEvent";
import { useCancelEvent } from "../../hooks/useCancelEvent";
import { useGetEvent } from "../../hooks/useGetEvent";
import { useUserData } from "../../hooks/useUserData";

export default function EventDetails() {
	const { eventId } = useParams();
	const { formatDate } = useGetEvents();
	const { event, isLoading } = useGetEvent();
	const { cancelEvent, isCanceling } = useCancelEvent(eventId);
	const { joinEvent, isJoining, isJoined } = useJoinEvent(eventId);
	const { accountOwner } = useUserData();

	if (isLoading) return <EventDetailsSkeleton />;

	const { eventTitle, eventDate, eventTime, user, eventDescription, eventCity, eventAvenue, eventParticipants } = event;

	const today = new Date();
	const isEventDateValid = new Date(event.eventDate) < new Date(today);

	const formattedDateTime = `${formatDate(eventDate)}, at ${eventTime}`;

	return (
		<motion.section
			initial="initial"
			animate="animate"
			variants={smoothOpacity}
			className="flex flex-col md:flex-row items-center sm:items-start justify-center gap-5 max-w-[1350px] mx-auto mt-5 sm:mt-9 pb-10 px-2 xl:px-0"
		>
			<div className="flex-3 rounded-md sm:p-5 w-full bg-primary">
				<div className="relative overflow-hidden border rounded-md">
					<img src={DEFAULT_BG_IMG} alt="background img" className="w-full h-[30vh] sm:h-[44vh] object-cover" />
					<div className="flex flex-col gap-y-1 absolute bottom-0 p-4 w-full h-[30vh] sm:h-[44vh] bg-black/75">
						<span className="font-medium text-[24px]">{eventTitle}</span>
						<span className="flex gap-x-2 text-[18px] items-center">{formattedDateTime}</span>
						<span>
							Hosted by{" "}
							<Link to={`/profile/user/${user?._id}`} className="font-semibold text-sky-300">
								{user.name || "Unkown"}
							</Link>
						</span>
					</div>
				</div>

				<div className="flex flex-col items-start gap-y-3 mt-5 p-3 rounded-sm border bg-secondary">
					<div className="flex items-center gap-x-4 border-b pb-2 text-sm sm:text-md">
						<span>
							<SlInfo className="size-5" />
						</span>
						{eventDescription}
					</div>

					<div className="flex items-center gap-x-4 border-b pb-3 w-full text-sm sm:text-md">
						<MdOutlineDateRange className="size-5" />
						{formattedDateTime}
					</div>

					<div className="flex items-center gap-x-4 border-b pb-3 w-full text-sm sm:text-md">
						<TfiLocationPin className="size-5" />
						{eventCity}, {eventAvenue}
					</div>

					{isEventDateValid && <span className="text-sm text-red-500">⛔ Notice: This event has ended.</span>}

					{isJoined && (
						<button
							onClick={() => cancelEvent()}
							className="cursor-pointer rounded-md font-semibold border-1 border-sky-300 text-sky-300 py-2 px-4 text-sm sm:text-md"
						>
							{isCanceling ? "Canceling..." : "Cancel My Place"}
						</button>
					)}

					{!isJoined && !isEventDateValid && (
						<button onClick={() => joinEvent()} className="btn py-2 px-4 text-sm sm:text-md">
							{accountOwner ? (isJoining ? "Joining..." : "Join This Event") : "Sign in to join this event"}
						</button>
					)}
				</div>
			</div>

			<EventParticipants participants={eventParticipants} />
		</motion.section>
	);
}
