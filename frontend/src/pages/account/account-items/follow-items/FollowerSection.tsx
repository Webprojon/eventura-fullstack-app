import { FaUser } from "react-icons/fa6";
import Heading from "../Heading";
import FollowSectionCards from "./FollowSectionCards";
import { useUserData } from "../../../../hooks/useUserData";

export default function FollowerSection() {
	const { accountOwner } = useUserData();

	return (
		<>
			<Heading icon={FaUser} text={`Followers ${accountOwner?.followers?.length || 0}`} />
			<div className="border-b mt-8 pb-2">
				{accountOwner?.followers?.length === 0 && <span className="text-sm text-slate-400">No followers yet. Stay active!</span>}
				<FollowSectionCards items={accountOwner?.followers} />
			</div>
		</>
	);
}
