import { FaPeopleGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { smoothOpacity } from "../../lib/page-animations";
import { motion } from "framer-motion";
import { AuthLayoutProps } from "../../lib/types";

export default function AuthLayout({ subtitle, children }: AuthLayoutProps) {
	return (
		<motion.section initial="initial" animate="animate" variants={smoothOpacity} className="min-h-screen flex-center">
			<div className="flex-center flex-wrap gap-10">
				<div className="flex-center flex-col sm:gap-y-4 flex-1">
					<Link to="/" className="flex-center gap-3">
						<FaPeopleGroup className="size-14 text-sky-300" />
						<h1 className="leading-none font-semibold text-4xl md:text-5xl text-center">Eventura</h1>
					</Link>
					<p className="text-xl tracking-wider text-slate-300">{subtitle}</p>
				</div>

				<div className="hidden md:block h-135 border-r"></div>

				<div>{children}</div>
			</div>
		</motion.section>
	);
}
