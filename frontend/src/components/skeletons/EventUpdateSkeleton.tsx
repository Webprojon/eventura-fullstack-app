import Skeleton from "react-loading-skeleton";

export const EventUpdateSkeleton = () => {
	const baseColor = "#1C2029";
	const highlightColor = "#2A2F3A";

	return (
		<section className="max-w-[1350px] md:mx-2 xl:mx-auto rounded-md px-4 py-5 sm:mt-9 border select-none bg-[#10141E]">
			{/* First row */}
			<Skeleton className="mb-4" height={20} width={200} baseColor={baseColor} highlightColor={highlightColor} />
			<Skeleton height={40} inline={true} count={2} width={"48%"} baseColor={baseColor} highlightColor={highlightColor} className="mr-4 mb-4" />
			{/* Second row */}
			<Skeleton className="mt-8 mb-4" height={20} width={200} baseColor={baseColor} highlightColor={highlightColor} />
			<Skeleton height={40} inline={true} count={2} width={"48%"} baseColor={baseColor} highlightColor={highlightColor} className="mr-4 mb-4" />
			{/* Third row */}
			<Skeleton className="mt-8 mb-4" height={20} width={200} baseColor={baseColor} highlightColor={highlightColor} />
			<Skeleton height={40} inline={true} count={2} width={200} baseColor={baseColor} highlightColor={highlightColor} className="mr-4 mb-4" />
			{/* Fourth row */}
			<Skeleton className="mt-4" height={100} width={"100%"} baseColor={baseColor} highlightColor={highlightColor} />

			{/* Buttons */}
			<div className="flex justify-end gap-x-6 mt-4">
				<Skeleton height={40} width={100} baseColor={baseColor} highlightColor={highlightColor} />
				<Skeleton height={40} width={130} baseColor={baseColor} highlightColor={highlightColor} />
			</div>
		</section>
	);
};
