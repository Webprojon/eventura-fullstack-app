import Skeleton from "react-loading-skeleton";

export const EventDetailsSkeleton = () => {
	const highlightcolor = "#2A2F3A";
	const basecolor = "#1C2029";
	return (
		<section className="flex flex-col md:flex-row items-start gap-5 mt-5 sm:mt-9 max-w-[1350px] min-h-[100vh] mx-auto pb-10 px-2 xl:px-0">
			{/* Main content */}
			<div className="relative flex-[2.5] rounded-md p-5 border bg-[#10141E] w-full">
				{/* Image skeleton */}
				<Skeleton height="44vh" className="rounded-md mb-5" baseColor={basecolor} highlightColor={highlightcolor} />

				{/* Overlay text on image */}
				<div className="flex flex-col gap-y-2 absolute top-6 p-4 w-full h-[44vh] z-10 pointer-events-none">
					<Skeleton height={25} width="32%" baseColor={basecolor} highlightColor={highlightcolor} />
					<Skeleton height={18} width="28%" baseColor={basecolor} highlightColor={highlightcolor} />
					<Skeleton height={18} width="26%" baseColor={basecolor} highlightColor={highlightcolor} />
				</div>

				{/* Info card */}
				<div className="flex flex-col gap-y-3 p-3 rounded-sm border bg-[#1C2029] z-0 relative">
					<Skeleton height={20} width="60%" baseColor={basecolor} highlightColor={highlightcolor} />
					<Skeleton height={15} width="40%" baseColor={basecolor} highlightColor={highlightcolor} />
					<Skeleton height={15} width="50%" baseColor={basecolor} highlightColor={highlightcolor} />
					<Skeleton height={35} width="24%" baseColor={basecolor} highlightColor={highlightcolor} />
				</div>
			</div>

			{/* Participants */}
			<div className="w-full sm:w-[300px] p-4 border rounded-md bg-[#10141E] flex flex-col gap-4">
				<Skeleton height={22} width="80%" baseColor={basecolor} highlightColor={highlightcolor} />
				{[...Array(3)].map((_, idx) => (
					<div key={idx} className="flex items-center gap-3">
						<Skeleton circle width={40} height={40} baseColor={basecolor} highlightColor={highlightcolor} />
						<Skeleton width="60%" height={15} baseColor={basecolor} highlightColor={highlightcolor} />
					</div>
				))}
			</div>
		</section>
	);
};
