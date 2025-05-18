import { FaUser } from "react-icons/fa6";
import { NO_AVATAR } from "../../../lib/data";
import { Link } from "react-router-dom";
import Heading from "./Heading";

// Temporary static data
const FOLLOWERS = [
	{
		id: 1,
		name: "Ali",
		img: NO_AVATAR,
	},
	{
		id: 2,
		name: "Bek",
		img: NO_AVATAR,
	},
];

export default function FollowerSection() {
	return (
		<>
			<Heading icon={FaUser} text={`Followers 2`} />
			<div className="flex gap-x-4 border-b mt-8 pb-2">
				{FOLLOWERS.map(({ id, img, name }) => (
					<Link to="/events" key={id} className="flex flex-col gap-y-1 justify-center items-center">
						<img src={img} alt="follower img" className="w-11 h-11 border object-cover rounded-full" />
						<span className="text-sm">{name}</span>
					</Link>
				))}
			</div>
		</>
	);
}
