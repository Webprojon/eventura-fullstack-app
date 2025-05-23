import { MdClose, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { modalAnim } from "../../lib/page-animations";
import ConfirmationModal from "./ConfirmationModal";
import { useDeleteEvent } from "../../hooks/useDeleteEvent";
import useModalStore from "../../store/modalStore";
import { useUserData } from "../../hooks/useUserData";

export function ManageEventBase({ id, isMobile = false }: { id: string; isMobile?: boolean }) {
	const isMenuOpen = useModalStore((state) => state.isMenuOpen(id));
	const toggleMenu = useModalStore((state) => state.toggleMenu);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { handleDelete } = useDeleteEvent();
	const { token } = useUserData();

	const toggleModal = () => setIsModalOpen((prev) => !prev);

	const linkTo = useMemo(() => (token ? `/events/update/${id}` : "/sign-in"), [token, id]);

	const menuClasses = isMobile ? "w-full flex justify-between sm:hidden mt-4" : "hidden sm:flex flex-col gap-y-3";

	const iconClasses = isMobile ? "size-5" : "size-4";

	const buttonClasses = !isMobile && "text-[14px]";

	return (
		<>
			<div className="flex gap-3">
				{isMenuOpen && (
					<motion.div onClick={() => toggleMenu(id)} initial="initial" animate="animate" variants={modalAnim} className={menuClasses}>
						<Link to={linkTo} className={`flex items-center gap-2 font-semibold text-sky-300 ${buttonClasses}`}>
							<MdOutlineEdit className={iconClasses} />
							Update event
						</Link>
						<button onClick={toggleModal} className={`flex items-center gap-2 cursor-pointer font-semibold text-red-400 ${buttonClasses}`}>
							<RiDeleteBin6Line className={iconClasses} />
							Delete event
						</button>
					</motion.div>
				)}

				{/* Show toggle button only on desktop */}
				{!isMobile && (
					<div onClick={() => toggleMenu(id)} className="flex items-center justify-center w-7 h-7">
						{isMenuOpen ? <MdClose className="cursor-pointer size-6" /> : <TfiMenuAlt className="cursor-pointer size-5" />}
					</div>
				)}
			</div>

			{/* Confirmation Modal */}
			{isModalOpen && <ConfirmationModal message="Confirm deletion of this event?" onCancel={toggleModal} onConfirm={() => handleDelete(id)} />}
		</>
	);
}
