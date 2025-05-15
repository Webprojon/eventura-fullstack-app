import { FaUser } from "react-icons/fa6";
import { NO_AVATAR } from "../../../lib/data";
import { Link } from "react-router-dom";

export default function FollowerSection() {
	return (
		<>
			<div className="flex items-center gap-3">
				<FaUser className="size-5" />
				<h1 className="text-xl leading-none">
					Followers <span className="text-sky-300">2</span>
				</h1>
			</div>

			<div className="flex gap-x-4 border-b mt-8 pb-2">
				<Link to="/events" className="flex flex-col gap-y-2 justify-center items-center">
					<img
						src={
							"https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
						}
						alt="follower img"
						className="w-12 h-12 border object-cover rounded-full"
					/>
					<span className="text-sm">Ali</span>
				</Link>
				<Link to="/events" className="flex flex-col gap-y-2 justify-center items-center">
					<img src={NO_AVATAR} alt="follower img" className="w-12 h-12 border object-cover rounded-full" />
					<span className="text-sm">Bek</span>
				</Link>
			</div>
		</>
	);
}
