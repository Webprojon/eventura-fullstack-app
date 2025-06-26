import { FaUser } from "react-icons/fa6";
import Heading from "../Heading";
import FollowSectionCards from "./FollowSectionCards";
import { useUserData } from "../../../../hooks/useUserData";

export default function FollowingSection() {
	const { accountOwner } = useUserData();

	return (
		<>
			<Heading icon={FaUser} text={`Following ${accountOwner?.following?.length || 0}`} />
			<div className="border-b mt-8 pb-2">
				{accountOwner?.following?.length === 0 && (
					<span className="text-sm text-slate-400">You're not following anyone. Discover and connect with others!</span>
				)}
				<FollowSectionCards items={accountOwner?.following} />
			</div>
		</>
	);
}
