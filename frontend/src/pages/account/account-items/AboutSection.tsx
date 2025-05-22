import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { useGetEvents } from "../../../hooks/useGetEvents";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import axios from "axios";
import { BASE_URL } from "../../../lib/data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Heading from "./Heading";
import { useUser } from "../../../hooks/useUser";

export default function AboutSection() {
	const { user } = useUser();
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [descriptionVal, setDescriptionVal] = useState(user?.description);
	const { formatDate } = useGetEvents();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: () => axios.delete(`${BASE_URL}/users/${user._id}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
			toast.success("Your account deleted.");
			localStorage.removeItem("token");
			navigate("/events");
		},
		onError: (error) => {
			toast.error(error.message || "Something went wrong");
		},
	});

	const { mutate } = useMutation({
		mutationFn: async (textValue: string) => {
			const res = await axios.put(
				`${BASE_URL}/users/${user?._id}`,
				{ description: textValue },
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			toast.success("User description is successfully added!");
		},
	});

	const handleAdd = () => mutate(descriptionVal);

	const handleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);

	return (
		<>
			<div className="flex justify-between items-center">
				<Heading icon={FaUser} text={`About ${user.name}`} />
				{descriptionVal !== user?.description && (
					<button onClick={handleAdd} className="py-[3px] px-4 font-extralight text-sm cursor-pointer rounded-md border text-sky-300">
						Save
					</button>
				)}
			</div>
			<span className="text-[13px] tracking-wider text-slate-300">Member since: {formatDate(user.createdAt)}</span>
			<textarea
				name="about"
				id="about"
				placeholder="Say something about you..."
				value={descriptionVal}
				onChange={(e) => setDescriptionVal(e.target.value)}
				className="bg-[#1C2029] textare-size w-full border p-3 h-[17vh] rounded-md mt-4 small-scroll text-sm tracking-wider leading-6 text-slate-300 outline-none"
			></textarea>
			<button onClick={handleDeleteModal} className="mt-2 py-2 sm:py-1 px-3 font-extralight text-sm cursor-pointer rounded-sm border-1 text-red-500">
				Delete Account
			</button>
			{isDeleteModalOpen && <ConfirmationModal message="Permanently delete your account?" onCancel={handleDeleteModal} onConfirm={() => mutation.mutate()} />}
		</>
	);
}
