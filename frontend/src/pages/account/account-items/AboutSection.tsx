import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { useGetEvents } from "../../../hooks/useGetEvents";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Heading from "./Heading";
import { useUserData } from "../../../hooks/useUserData";
import { apiRequest } from "../../../lib/apiRequest";

export default function AboutSection() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { formatDate } = useGetEvents();
	const { accountOwner } = useUserData();
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [descriptionVal, setDescriptionVal] = useState(accountOwner?.description);

	const deleteAccountMutation = useMutation({
		mutationFn: () => apiRequest.delete(`/users/${accountOwner._id}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
			toast.success("Your account deleted!");
			localStorage.removeItem("refreshToken");
			navigate("/events");
		},
		onError: (error) => {
			toast.error(error.message || "Something went wrong");
		},
	});

	const updateDescriptionMutation = useMutation({
		mutationFn: async (textValue: string) => {
			const res = await apiRequest.put(
				`/users/${accountOwner?._id}`,
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
			queryClient.invalidateQueries({ queryKey: ["user"] });
			toast.success("Description is updated!");
		},
	});

	const toggleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);

	const handleUpdate = () => updateDescriptionMutation.mutate(descriptionVal);

	return (
		<>
			<div className="flex justify-between items-center">
				<Heading icon={FaUser} text={`About ${accountOwner?.name}`} />
				{descriptionVal !== accountOwner?.description && (
					<button onClick={handleUpdate} className="py-[3px] px-4 font-extralight text-sm cursor-pointer rounded-md border text-sky-300">
						Save
					</button>
				)}
			</div>
			<span className="text-[13px] tracking-wider text-slate-300">Member since: {formatDate(accountOwner?.createdAt)}</span>
			<textarea
				name="about"
				id="about"
				placeholder="Say something about you..."
				value={descriptionVal}
				onChange={(e) => setDescriptionVal(e.target.value)}
				className="bg-[#1C2029] textare-size w-full border p-3 h-[17vh] rounded-md mt-4 small-scroll text-sm tracking-wider leading-6 text-slate-300 outline-none"
			></textarea>
			<button onClick={toggleDeleteModal} className="mt-2 py-2 sm:py-1 px-3 font-extralight text-sm cursor-pointer rounded-sm border-1 text-red-500">
				Delete Account
			</button>
			{isDeleteModalOpen && (
				<ConfirmationModal message="Permanently delete your account?" onCancel={toggleDeleteModal} onConfirm={() => deleteAccountMutation.mutate()} />
			)}
		</>
	);
}
