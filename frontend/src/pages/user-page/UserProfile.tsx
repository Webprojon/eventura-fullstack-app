import { motion } from "framer-motion";
import { smoothOpacity } from "../../lib/page-animations";
import { useParams } from "react-router-dom";

export default function UserProfile() {
	const { id } = useParams();
	return (
		<motion.section
			initial="initial"
			animate="animate"
			variants={smoothOpacity}
			className="flex items-start gap-5 mt-5 sm:mt-9 max-w-[1350px] min-h-[100vh] mx-auto pb-10 px-2 xl:px-0"
		>
			User: {id}
		</motion.section>
	);
}
