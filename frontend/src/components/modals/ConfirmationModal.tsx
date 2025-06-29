import { motion } from "framer-motion";
import { modalAnim } from "../../lib/page-animations";
import { ConfirmationModalProps } from "../../lib/types";

export default function ConfirmationModal({ message, onCancel, onConfirm }: ConfirmationModalProps) {
	return (
		<motion.div
			onClick={onCancel}
			initial="initial"
			animate="animate"
			variants={modalAnim}
			className="fixed left-0 top-0 w-full h-screen bg-black/50 flex items-center justify-center px-2"
		>
			<div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-6 tracking-wider py-6 px-12 rounded-md bg-primary">
				<span className="text-center font-medium text-lg">{message}</span>
				<div className="flex justify-center gap-6">
					<button onClick={onCancel} className="py-2 px-5 text-sm rounded-md font-semibold cursor-pointer border border-sky-300 text-sky-300">
						Cancel
					</button>
					<button onClick={onConfirm} className="btn py-2 px-5 text-sm">
						Confirm
					</button>
				</div>
			</div>
		</motion.div>
	);
}
