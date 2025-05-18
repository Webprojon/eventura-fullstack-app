import { ComponentType } from "react";

export default function Heading({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) {
	return (
		<div className="flex items-center gap-3 mb-2">
			{Icon && <Icon className="size-5" />}
			<h1 className="text-xl">{text}</h1>
		</div>
	);
}
