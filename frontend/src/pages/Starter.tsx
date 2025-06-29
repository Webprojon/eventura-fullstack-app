import { FaPeopleGroup } from "react-icons/fa6";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fromTopToBottom } from "../lib/page-animations";

export default function StarterPage() {
	return (
		<section className="flex-center h-screen">
			<motion.div initial="initial" animate="animate" variants={fromTopToBottom} className="flex-center flex-col gap-y-4">
				<div className="flex items-center gap-4">
					<FaPeopleGroup className="size-12 text-sky-300" />
					<h1 className="leading-none font-semibold text-5xl">Eventura</h1>
				</div>
				<p className="text-lg text-slate-300 text-center px-2 max-w-lg">Your gateway to discovering and joining amazing events around you.</p>
				<Link to="/events" className="flex-center gap-x-2 group mt-6 py-2 px-12 btn">
					START
					<MdArrowForward className="size-5 transform transition-transform duration-200 group-hover:translate-x-1" />
				</Link>
			</motion.div>
		</section>
	);
}
