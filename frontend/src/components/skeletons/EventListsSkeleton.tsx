import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function EventListsSkeleton({ count = 3 }) {
	const highlightcolor = "#2A2F3A";
	const basecolor = "#1C2029";

	return (
		<>
			{Array(count)
				.fill(0)
				.map((_, i) => (
					<div key={i} className="rounded-md p-5 border bg-[#10141E]">
						<div className="flex gap-6 border-b pb-2">
							<Skeleton circle width={60} height={60} baseColor={basecolor} highlightColor={highlightcolor} />
							<div className="flex flex-col w-full gap-2">
								<Skeleton width="60%" height={20} baseColor={basecolor} highlightColor={highlightcolor} />
								<Skeleton width="40%" height={15} baseColor={basecolor} highlightColor={highlightcolor} />
							</div>
						</div>

						<div className="justify-between items-center py-5">
							<Skeleton width="30%" height={15} baseColor={basecolor} highlightColor={highlightcolor} />
							<Skeleton width="30%" height={15} baseColor={basecolor} highlightColor={highlightcolor} />
						</div>

						<div className="p-3 rounded-sm border bg-[#1C2029]">
							<div className="flex items-center gap-x-2 p-2 mb-4 border-b">
								{[...Array(3)].map((_, i) => (
									<Skeleton key={i} circle width={36} height={36} baseColor={basecolor} highlightColor={highlightcolor} />
								))}
							</div>
							<Skeleton height={10} className="mb-2" baseColor={basecolor} highlightColor={highlightcolor} />
							<Skeleton width="25%" height={15} baseColor={basecolor} highlightColor={highlightcolor} />
						</div>
					</div>
				))}
		</>
	);
}
