import { Link } from "react-router-dom";
import { NO_AVATAR } from "../../../../lib/data";
import { FollowType } from "../../../../lib/types";

export default function FollowSectionCards({ items }: { items: FollowType[] | undefined }) {
	return (
		<div className="flex gap-x-4">
			{items?.map(({ _id, userImg, name }) => (
				<Link to="/profile/user/682a4148ebf0deada97fd486" key={_id} className="flex flex-col gap-y-1 justify-center items-center">
					<img src={userImg || NO_AVATAR} alt="follower img" className="w-11 h-11 border object-cover rounded-full" />
					<span className="text-sm">{name}</span>
				</Link>
			))}
		</div>
	);
}
