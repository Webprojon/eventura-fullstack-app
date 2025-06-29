import { ChangeEvent, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Heading from "./Heading";
import { useUserData } from "../../../hooks/useUserData";
import { apiRequest } from "../../../lib/apiRequest";

export default function PhotoSection() {
	const { accountOwner } = useUserData();
	const [userImage, setUserImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const queryClient = useQueryClient();

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setUserImage(file);
			const reader = new FileReader();
			reader.onload = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const uploadPhotoMutation = useMutation({
		mutationFn: async (formData: FormData) => {
			const res = await apiRequest.post(`/users/upload`, formData);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
			toast.success("Photo is uploaded!");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleUpload = async () => {
		if (!userImage) {
			toast.error("Please select an image first");
			return;
		}
		const formData = new FormData();
		formData.append("userImg", userImage);
		formData.append("userId", accountOwner._id);
		uploadPhotoMutation.mutate(formData);
	};

	const deletePhoto = () => {
		setUserImage(null);
		setPreview(null);
	};

	return (
		<>
			<div className="flex justify-between items-start">
				<Heading icon={FaUser} text="Photo" />
				{userImage && (
					<button onClick={handleUpload} className="py-2 px-4 font-extralight text-sm cursor-pointer rounded-md border text-sky-300">
						Save photo
					</button>
				)}
			</div>
			<div className="w-36 relative mt-4">
				{preview && <img alt="Uploaded" src={preview} className="w-36 h-36 object-cover border rounded" />}
				<input
					required
					type="file"
					id="uploadcarimages"
					accept="image/*"
					onChange={handleImageChange}
					className="absolute inset-0 w-36 opacity-0 border cursor-pointer"
				/>
				{!userImage && (
					<button
						type="button"
						className="flex flex-col items-center justify-center gap-y-2 h-36 w-36 font-extralight border rounded-md text-sky-300"
					>
						<FaCloudUploadAlt className="size-6" />
						Upload Photo
					</button>
				)}
			</div>
			{userImage && (
				<button
					onClick={deletePhoto}
					className="w-36 mt-2 py-1 px-4 font-extralight text-sm cursor-pointer rounded-md border-1 border-red-400 text-red-400"
				>
					Delete Photo
				</button>
			)}
		</>
	);
}
