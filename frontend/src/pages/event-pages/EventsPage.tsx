import { motion } from "framer-motion";
import EventLists from "../../components/event-components/EventLists";
import { smoothOpacity } from "../../lib/page-animations";
import EventCalendar from "../../components/event-components/EventCalendar";

export default function EventsPage() {
	return (
		<motion.section initial="initial" animate="animate" variants={smoothOpacity} className="container flex items-start gap-5 mt-5 sm:mt-9	pb-10 px-2 xl:px-0">
			<EventLists />
			<EventCalendar />
		</motion.section>
	);
}
