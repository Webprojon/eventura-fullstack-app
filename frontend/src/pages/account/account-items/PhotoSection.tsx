import { ChangeEvent, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function PhotoSection() {
	const [userImage, setUserImage] = useState<File | null>(null);
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setUserImage(file);

			const reader = new FileReader();
			reader.onload = (event) => {
				if (event.target) {
					setUploadedImage(event.target.result as string);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div>
			<div className="flex justify-between items-start">
				<div className="flex items-center gap-3">
					<FaUser className="size-5" />
					<h1 className="text-xl leading-none">Photo</h1>
				</div>
				{userImage && <button className="py-[5px] px-4 font-extralight text-sm cursor-pointer rounded-md border text-sky-300">Save photo</button>}
			</div>

			<div className="flex flex-col gap-y-3 w-[140px] items-start relative gap-x-4 mt-6">
				{uploadedImage && <img alt="Uploaded" src={uploadedImage} className="w-[150px] h-[150px] object-cover border rounded" />}
				<input
					required
					type="file"
					id="uploadcarimages"
					accept="image/*"
					onChange={handleImageChange}
					className="absolute inset-0 w-[140px] opacity-0 border cursor-pointer"
				/>
				{!userImage && (
					<button
						type="button"
						className="flex flex-col items-center justify-center gap-y-2 h-[140px] w-[140px] font-extralight border rounded-md text-sky-300"
					>
						<FaCloudUploadAlt className="size-6" />
						Upload Photo
					</button>
				)}

				{userImage && (
					<button className="w-full py-1 px-4 font-extralight text-sm cursor-pointer rounded-md border-1 border-red-400 text-red-400">Delete Photo</button>
				)}
			</div>
		</div>
	);
}
