import { FaUser } from "react-icons/fa6";
import Heading from "../Heading";
import Loader from "../../../../components/Loader";
import { useFollow } from "../../../../hooks/useFollow";
import FollowSectionCards from "./FollowSectionCards";

export default function FollowingSection() {
	const { followingData, followingCount, followingLoading } = useFollow();

	return (
		<>
			<Heading icon={FaUser} text={`Following ${followingCount}`} />
			<div className="border-b mt-8 pb-2">
				{followingLoading && <Loader className="w-10 h-10" />}
				{followingData?.length === 0 && <span className="text-sm text-slate-400">You're not following anyone. Discover and connect with others!</span>}
				<FollowSectionCards items={followingData} />
			</div>
		</>
	);
}
