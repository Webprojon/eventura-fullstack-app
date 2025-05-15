import { FaPeopleGroup } from "react-icons/fa6";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fromTopToBottom } from "../../lib/page-animations";

export default function StarterPage() {
	return (
		<motion.section className="flex items-center justify-center h-[100vh]">
			<motion.div initial="initial" animate="animate" variants={fromTopToBottom} className="flex flex-col gap-y-4 items-center justify-center z-50">
				<div className="flex items-center gap-3">
					<FaPeopleGroup className="size-12 text-sky-300" />
					<h1 className="leading-none font-semibold text-[46px]">Eventura</h1>
				</div>
				<p className="text-lg text-slate-300 text-center px-2">Your gateway to discovering and joining amazing events around you.</p>
				<Link to="/events" className="flex items-center gap-x-2 group mt-6 py-[10px] px-[46px] btn">
					START
					<MdArrowForward className="size-5 transform transition-transform duration-200 group-hover:translate-x-1" />
				</Link>
			</motion.div>
		</motion.section>
	);
}
