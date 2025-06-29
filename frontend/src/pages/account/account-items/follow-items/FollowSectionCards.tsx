import { Link } from "react-router-dom";
import { NO_AVATAR } from "../../../../lib/data";
import { FollowType } from "../../../../lib/types";
import { useUserData } from "../../../../hooks/useUserData";

export default function FollowSectionCards({ items }: { items: FollowType[] | undefined }) {
	const { getUserProfileLink } = useUserData();

	return (
		<div className="flex gap-x-4">
			{items?.map(({ _id, image, name }) => (
				<Link to={getUserProfileLink(_id)} key={_id} className="flex flex-col gap-y-2 justify-center items-center">
					<img src={image || NO_AVATAR} alt="follower img" className="w-11 h-11 border object-cover rounded-full" />
					<span className="text-sm">{name}</span>
				</Link>
			))}
		</div>
	);
}
