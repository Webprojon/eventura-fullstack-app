import { Link } from "react-router-dom";
import { NO_AVATAR } from "../../lib/data";
import { UserType } from "../../lib/types";
import { TbUsers } from "react-icons/tb";
import { useUserData } from "../../hooks/useUserData";

export default function EventParticipants({ participants }: { participants: UserType[] }) {
	const { getUserProfileLink } = useUserData();

	return (
		<div className="w-full flex-1 rounded-md border select-none bg-primary">
			<div className="flex items-center gap-x-2 px-3 py-2 border-b">
				<TbUsers className="size-5" />
				<span className="font-semibold sm:text-[18px]">Participants {participants.length}</span>
			</div>
			<div className="flex flex-col gap-y-3 p-3 max-h-[35.4vh] overflow-y-scroll small-scroll">
				{participants.map(({ _id, name, image }) => (
					<Link
						key={_id}
						to={getUserProfileLink(_id)}
						className="flex items-center gap-x-4 px-3 py-[5px] rounded-md transition-all hover:scale-101 bg-secondary"
					>
						<img src={image || NO_AVATAR} alt="coming user" className="w-10 h-10 border rounded-full object-cover" />
						<span className="font-medium">{name}</span>
					</Link>
				))}
			</div>
		</div>
	);
}
