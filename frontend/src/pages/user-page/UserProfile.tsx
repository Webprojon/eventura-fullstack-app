import { motion } from "framer-motion";
import { smoothOpacity } from "../../lib/page-animations";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_BG_IMG, NO_AVATAR } from "../../lib/data";

export default function UserProfile() {
	const { id } = useParams();

	const { data, isLoading } = useQuery({
		queryKey: ["user", id],
		queryFn: async () => {
			const res = await axios.get(`http://localhost:5500/api/v1/users/${id}`);
			return res.data;
		},
		enabled: !!id,
	});

	return (
		<motion.section
			initial="initial"
			animate="animate"
			variants={smoothOpacity}
			className="flex items-start gap-6 mt-5 sm:mt-9 max-w-[1350px] mx-auto pb-10 px-2 xl:px-0 select-none"
		>
			<div className="flex flex-[1] flex-col gap-2 p-3 sm:p-4 rounded-md border text-slate-200 bg-[#10141E]">
				<img src={data?.data.userImg || NO_AVATAR} alt="user img" className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full border object-cover" />
				<span className="sm:text-xl">{data?.data.name}</span>
				<span className="text-sm">Member since: 12 May, 2025</span>
				<span className="text-sm">
					<strong>Contact: </strong>
					{data?.data.email}
				</span>
				<div className="font-extralight cursor-pointer text-sky-300">
					<button className="cursor-pointer mr-4">{0} Followers</button>
					<button className="cursor-pointer">Follow</button>
				</div>
			</div>

			<div className="flex-[3] sm:p-4 rounded-md border text-slate-300 bg-[#10141E]">
				<h1 className="font-medium tracking-wider">{data?.data.name}'s Events</h1>
				<div className="flex flex-wrap gap-6 mt-4">
					<Link to={`/events/12232434`} className="w-[9rem] border overflow-hidden rounded-md cursor-pointer">
						<img src={DEFAULT_BG_IMG} alt="event img" />
						<div className="flex flex-col gap-y-1 bg-[#1C2029] text-[14px] p-1">
							<span className="text-[14px]">Running 20 KM</span>
							<span>12 May 2025</span>
							<span>12:00</span>
						</div>
					</Link>
					<Link to={`/events/12232434`} className="w-[9rem] border overflow-hidden rounded-md cursor-pointer">
						<img src={DEFAULT_BG_IMG} alt="event img" />
						<div className="flex flex-col gap-y-1 bg-[#1C2029] text-[14px] p-1">
							<span className="text-[14px]">Running 20 KM</span>
							<span>12 May 2025</span>
							<span>12:00</span>
						</div>
					</Link>
				</div>
			</div>
		</motion.section>
	);
}
