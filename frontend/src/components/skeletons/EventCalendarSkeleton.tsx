import Skeleton from "react-loading-skeleton";

export default function EventCalendarSkeleton() {
	const highlightcolor = "#2A2F3A";
	const basecolor = "#1C2029";
	return (
		<div className="hidden md:block w-[380px] p-4 rounded-md bg-[#10141e]">
			<div className="flex justify-between items-center mb-4">
				<Skeleton width="1.5rem" height="1.5rem" baseColor={basecolor} highlightColor={highlightcolor} />
				<Skeleton width="7rem" height="1.5rem" baseColor={basecolor} highlightColor={highlightcolor} />
				<Skeleton width="1.5rem" height="1.5rem" baseColor={basecolor} highlightColor={highlightcolor} />
			</div>
			<Skeleton width="100%" height="280px" className="rounded-md" baseColor={basecolor} highlightColor={highlightcolor} />
		</div>
	);
}
