import { useState } from "react";
import { NO_AVATAR } from "../../lib/data";
import { FaCaretDown, FaCaretUp, FaPlus, FaPowerOff, FaUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../../hooks/useUserData";
import { apiRequest } from "../../lib/apiRequest";
import { useMutation } from "@tanstack/react-query";

export default function Dropdown() {
	const [isOpen, setIsOpen] = useState(false);
	const { createEventOrSignInLink, accountOwner } = useUserData();
	const navigate = useNavigate();

	const toggleMenu = () => setIsOpen((prev) => !prev);

	const { mutate: logout } = useMutation({
		mutationFn: async () => {
			return await apiRequest.post("/auth/sign-out");
		},
		onSuccess: () => {
			navigate("/");
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		logout();
	};

	const MENU_ITEMS = [
		{
			label: "Create Event",
			icon: <FaPlus className="text-sky-300" />,
			to: createEventOrSignInLink,
			onClick: undefined,
		},
		{
			label: "My Profile",
			icon: <FaUser className="text-sky-300" />,
			to: "/account/me",
			onClick: undefined,
		},
		{
			label: "Log out",
			icon: <FaPowerOff className="text-sky-300" />,
			to: "/events",
			onClick: handleLogout,
		},
	];

	return (
		<div className="relative">
			{isOpen && <div onClick={toggleMenu} className="fixed top-0 left-0 w-full h-full bg-black/50 z-[300]"></div>}
			<div onClick={toggleMenu} className="flex items-center gap-x-3 cursor-pointer select-none">
				<div className="rounded-full bg-[#1C2029]">
					<img src={accountOwner?.image || NO_AVATAR} alt="user img" className="w-9 h-9 rounded-full border object-cover" />
				</div>
				<span>{accountOwner?.name}</span>
				<div className="hidden sm:block">{isOpen ? <FaCaretUp /> : <FaCaretDown />}</div>
			</div>
			{isOpen && (
				<div
					onClick={toggleMenu}
					className="flex flex-col items-start gap-y-6 sm:gap-y-5 sm:text-sm absolute top-12 right-0 py-4 px-3 w-[160px] sm:w-[152px] border rounded-md z-[400] bg-[#1C2029]"
				>
					{MENU_ITEMS.map((item, index) => (
						<Link key={index} to={item.to} className="flex items-center gap-x-3 hover:text-slate-300" onClick={item.onClick}>
							{item.icon}
							{item.label}
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
