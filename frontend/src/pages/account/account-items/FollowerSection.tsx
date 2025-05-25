import { FaUser } from "react-icons/fa6";
import { NO_AVATAR } from "../../../lib/data";
import { Link } from "react-router-dom";
import Heading from "./Heading";
import Loader from "../../../components/Loader";
import { useFollow } from "../../../hooks/useFollow";

export default function FollowerSection() {
	const { followItems, isLoading, followCount } = useFollow("follower");

	return (
		<>
			<Heading icon={FaUser} text={`Followers ${followCount}`} />
			<div className="flex gap-x-4 border-b mt-8 pb-2">
				{isLoading && <Loader className="w-10 h-10" />}
				{followItems?.length === 0 && <span className="text-sm text-slate-400">No followers yet. Stay active!</span>}
				{followItems?.map(({ _id, userImg, name }) => (
					<Link to="/events" key={_id} className="flex flex-col gap-y-1 justify-center items-center">
						<img src={userImg || NO_AVATAR} alt="follower img" className="w-11 h-11 border object-cover rounded-full" />
						<span className="text-sm">{name}</span>
					</Link>
				))}
			</div>
		</>
	);
}
