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
			className="fixed left-0 top-0 w-full h-screen bg-black/50 flex items-center justify-center"
		>
			<div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-6 tracking-wider py-6 px-12 rounded-md bg-[#10141E]">
				<span className="font-medium text-lg">{message}</span>
				<div className="flex justify-end gap-4">
					<button onClick={onCancel} className="py-[5px] px-4 text-sm rounded-md font-semibold cursor-pointer border border-sky-300 text-sky-300">
						Cancel
					</button>
					<button onClick={onConfirm} className="btn py-[5px] px-4 text-sm">
						Confirm
					</button>
				</div>
			</div>
		</motion.div>
	);
}
