import { MdOutlineDateRange } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { NO_AVATAR } from "../../lib/data";
import { useGetEvents } from "../../hooks/useGetEvents";
import { EventListsSkeleton } from "../skeletons/EventListsSkeleton";
import { ManageEventBase } from "../modals/ManageEventModal";

export default function EventLists() {
	const { data, isLoading, formatDate } = useGetEvents();

	const linkTo = (id: string) => {
		return `/profile/user/${id}`;
	};

	return (
		<section className="flex flex-col gap-y-6 sm:gap-y-5 flex-[2.5] z-40">
			{isLoading && <EventListsSkeleton count={2} />}
			{data?.data.map(({ _id, eventParticipants, eventTitle, user, eventDate, eventTime, eventCity, eventAvenue, eventDescription }) => (
				<div key={_id} className="rounded-md p-3 border bg-[#10141E]">
					<div className="flex justify-between items-start border-b">
						<div className="flex gap-x-4 pb-2">
							<Link to={linkTo(user?._id)} className="rounded-full bg-[#1C2029]">
								<img
									alt="User img"
									src={user.userImg || NO_AVATAR}
									className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full object-cover border bg-[#1C2029"
								/>
							</Link>
							<div className="flex flex-col">
								<span className="font-medium text-[20px]">{eventTitle}</span>
								<span className="text-[14px]">
									Organised by{" "}
									<Link to={linkTo(user?._id)} className="font-semibold text-sky-300">
										{user?.name || "Unknown"}
									</Link>
								</span>
							</div>
						</div>
						<ManageEventBase id={_id} />
					</div>
					<div className="flex justify-between items-center gap-y-3 flex-wrap py-3">
						<span className="flex gap-x-2 items-center">
							<MdOutlineDateRange className="size-5" />
							{formatDate(eventDate)}, at {eventTime}
						</span>
						<span className="flex gap-x-2 items-center">
							<TfiLocationPin className="size-5" />
							{eventCity}, {eventAvenue}
						</span>
					</div>
					<div className="p-3 rounded-sm border bg-[#1C2029]">
						{eventParticipants.length !== 0 && (
							<div className="flex items-center gap-x-2 pb-2 mb-4 border-b">
								{eventParticipants.map(({ _id, name, userImg }, idx) => (
									<Link to={linkTo(_id)} key={idx} className="flex flex-col items-center gap-y-1 cursor-pointer">
										<img alt="User img" key={idx} src={userImg || NO_AVATAR} className="w-9 h-9 rounded-full border object-cover" />
										<span className="text-[11px]">{name}</span>
									</Link>
								))}
							</div>
						)}
						<p className="line-clamp-1 sm:line-clamp-none">
							{eventDescription.length > 15 ? eventDescription.split(" ").slice(0, 15).join(" ") + "..." : eventDescription}
						</p>
						<Link to={`/events/${_id}`} className="flex justify-end mt-4 font-medium text-sky-300">
							Learn More
						</Link>
					</div>

					<ManageEventBase id={_id} isMobile />
				</div>
			))}
		</section>
	);
}
