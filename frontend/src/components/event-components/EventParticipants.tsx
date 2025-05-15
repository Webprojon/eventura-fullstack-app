import { Link } from "react-router-dom";
import { ParticipantType } from "../../lib/types";
import { NO_AVATAR } from "../../lib/data";

export default function EventParticipants({ participants }: { participants: ParticipantType[] }) {
	return (
		<div className="w-full flex-1 rounded-md border select-none bg-[#10141E]">
			<div className="px-3 py-2 border-b">
				<span className="font-semibold text-[18px]">Participants {participants.length}</span>
			</div>
			<div className="flex flex-col gap-y-3 p-3 max-h-[35.4vh] overflow-y-scroll small-scroll">
				{participants.map(({ _id, name, img }) => (
					<Link
						key={_id}
						to={`/profile/${name.toLowerCase().replace(/\s+/g, "-")}`}
						className="flex items-center gap-x-4 px-3 py-[5px] rounded-md transition-all bg-[#1C2029] hover:bg-[#262a34]"
					>
						<img src={img || NO_AVATAR} alt="coming user" className="w-10 h-10 rounded-full" />
						<span className="font-medium">{name}</span>
					</Link>
				))}
			</div>
		</div>
	);
}
