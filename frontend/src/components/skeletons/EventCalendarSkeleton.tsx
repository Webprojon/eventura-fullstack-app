import Skeleton from "react-loading-skeleton";

export default function EventCalendarSkeleton() {
	const highlightColor = "bg-tertiary";
	const baseColor = "bg-secondary";
	return (
		<div className="hidden md:block w-[380px] p-4 rounded-md bg-primary">
			<div className="flex justify-between items-center mb-4">
				<Skeleton width="1.5rem" height="1.5rem" baseColor={baseColor} highlightColor={highlightColor} />
				<Skeleton width="7rem" height="1.5rem" baseColor={baseColor} highlightColor={highlightColor} />
				<Skeleton width="1.5rem" height="1.5rem" baseColor={baseColor} highlightColor={highlightColor} />
			</div>
			<Skeleton width="100%" height="280px" className="rounded-md" baseColor={baseColor} highlightColor={highlightColor} />
		</div>
	);
}
