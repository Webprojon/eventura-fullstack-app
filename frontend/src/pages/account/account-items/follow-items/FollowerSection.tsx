import { FaUser } from "react-icons/fa6";
import Heading from "../Heading";
import Loader from "../../../../components/Loader";
import { useFollow } from "../../../../hooks/useFollow";
import FollowSectionCards from "./FollowSectionCards";

export default function FollowerSection() {
	const { followerData, followerCount, followerLoading } = useFollow();

	return (
		<>
			<Heading icon={FaUser} text={`Followers ${followerCount}`} />
			<div className="border-b mt-8 pb-2">
				{followerLoading && <Loader className="w-10 h-10" />}
				{followerData?.length === 0 && <span className="text-sm text-slate-400">No followers yet. Stay active!</span>}
				<FollowSectionCards items={followerData} />
			</div>
		</>
	);
}
