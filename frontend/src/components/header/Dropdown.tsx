import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import { NO_AVATAR } from "../../lib/data";
import { FaCaretDown, FaCaretUp, FaPlus, FaPowerOff, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Dropdown() {
	const [isOpen, setIsOpen] = useState(false);
	const { linkTo, user, handleLogOut } = useUser();
	const handleMenu = () => {
		setIsOpen(!isOpen);
	};

	const menuItems = [
		{
			label: "Create Event",
			icon: <FaPlus className="text-sky-300" />,
			to: linkTo,
			onClick: undefined,
		},
		{
			label: "My Account",
			icon: <FaUser className="text-sky-300" />,
			to: "/account/me",
			onClick: undefined,
		},
		{
			label: "Log out",
			icon: <FaPowerOff className="text-sky-300" />,
			to: "/events",
			onClick: handleLogOut,
		},
	];

	return (
		<div className="relative">
			{isOpen && <div onClick={handleMenu} className="fixed top-0 left-0 w-full h-full bg-black/50 z-[300]"></div>}
			<div onClick={handleMenu} className="flex items-center gap-x-3 cursor-pointer select-none">
				<div className="rounded-full bg-[#1C2029]">
					<img src={user?.userImg || NO_AVATAR} alt="user img" className="w-9 h-9 rounded-full border object-cover" />
				</div>
				<span>{user?.name}</span>
				<div className="hidden sm:block">{isOpen ? <FaCaretUp /> : <FaCaretDown />}</div>
			</div>
			{isOpen && (
				<div
					onClick={handleMenu}
					className="flex flex-col items-start gap-y-5 sm:gap-y-4 sm:text-sm absolute top-12 right-0 py-4 px-3 w-[160px] sm:w-[152px] border rounded-md z-[400] bg-[#1C2029]"
				>
					{menuItems.map((item, index) => (
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
