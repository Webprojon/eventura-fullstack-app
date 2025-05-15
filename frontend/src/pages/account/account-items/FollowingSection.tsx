import { FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { NO_AVATAR } from "../../../lib/data";

export default function FollowingSection() {
	return (
		<>
			<div className="flex items-center gap-3">
				<FaUser className="size-5" />
				<h1 className="text-xl leading-none">
					Following <span className="text-sky-300">1</span>
				</h1>
			</div>

			<div className="flex gap-x-4 border-b mt-8 pb-2">
				<Link to="/events" className="flex flex-col gap-y-2 justify-center items-center">
					<img src={NO_AVATAR} alt="follower img" className="w-12 h-12 border object-cover rounded-full" />
					<span className="text-sm">Bek</span>
				</Link>
			</div>
		</>
	);
}
