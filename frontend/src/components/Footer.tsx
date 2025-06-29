import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="container flex flex-col gap-1 sm:flex-row items-center justify-center sm:justify-between h-12 border-t px-2 xl:px-0 text-[12px] sm:text-[13px] font-extralight text-slate-300">
			<span>Copyright © 2025 Eventura. All rights reserved</span>
			<Link to="/">Privacy Policy</Link>
		</footer>
	);
}
