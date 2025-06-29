import { smoothOpacity } from "../../lib/page-animations";
import { motion } from "framer-motion";
import EventForm from "../../components/event-components/EventForm";

export default function UpdateEvent() {
	return (
		<motion.section
			initial="initial"
			animate="animate"
			variants={smoothOpacity}
			className="container md:mx-2 px-4 md:rounded-md py-5 md:mt-9 border select-none bg-primary"
		>
			<EventForm />
		</motion.section>
	);
}
