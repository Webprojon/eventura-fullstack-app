import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import Input from "../../../components/input-components/Input";
import { useGetEvents } from "../../../hooks/useGetEvents";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";

type AboutSectionProps = {
	user: { name: string; email: string; createdAt: string };
};

export default function AboutSection({ user }: AboutSectionProps) {
	const { formatDate } = useGetEvents();
	const [textValue, setTextValue] = useState("");
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [userName, setUserName] = useState(user.name);
	const [userEmail, setUserEmail] = useState(user.email);
	const [userPassword, setUserPassword] = useState("");

	const handleDeleteModal = () => {
		setIsDeleteModalOpen(!isDeleteModalOpen);
	};

	const onConfirm = () => {};

	const handleUpdateModal = () => {
		setIsUpdateModalOpen(!isUpdateModalOpen);
	};

	return (
		<>
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-3">
					<FaUser className="size-5" />
					<h1 className="text-xl">About {user.name}</h1>
				</div>
				<div className="flex gap-x-3">
					<button onClick={handleUpdateModal} className="py-[3px] px-4 font-extralight text-sm cursor-pointer rounded-md border text-sky-300">
						<MdOutlineEdit className="size-4" />
					</button>
					{textValue && <button className="py-[3px] px-4 font-extralight text-sm cursor-pointer rounded-md border text-sky-300">Save</button>}
				</div>
			</div>

			<div className="mt-4">
				<p className="text-slate-300 text-sm tracking-wider">Member since: {formatDate(user.createdAt)}</p>
				<textarea
					name="about"
					id="about"
					placeholder="Say something about you..."
					value={textValue}
					onChange={(e) => setTextValue(e.target.value)}
					className="bg-[#1C2029] textare-size w-full border p-3 h-[20vh] rounded-md mt-4 small-scroll text-sm tracking-wider leading-6 text-slate-300 outline-none"
				></textarea>

				{isUpdateModalOpen && (
					<div className="flex flex-wrap gap-3 mt-2">
						<Input type="text" name="username" id="username" text="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
						<Input type="email" name="useremail" id="useremail" text={user.email} value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
						<Input
							type="password"
							name="userpassword"
							id="userpassword"
							text="Password"
							value={userPassword}
							onChange={(e) => setUserPassword(e.target.value)}
						/>
					</div>
				)}
			</div>

			<div className="flex gap-x-4 mt-4">
				<button onClick={handleDeleteModal} className="py-1 px-3 font-extralight text-sm cursor-pointer rounded-sm border-1 text-red-500">
					Delete Account
				</button>
			</div>
			{isDeleteModalOpen && <ConfirmationModal message="Permanently delete your account?" onCancel={handleDeleteModal} onConfirm={onConfirm} />}
		</>
	);
}
