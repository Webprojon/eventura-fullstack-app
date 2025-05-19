import { ComponentType } from "react";

export default function Heading({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) {
	return (
		<div className="flex items-center gap-3 mb-1">
			{Icon && <Icon className="size-4" />}
			<h1 className="text-lg font-medium">{text}</h1>
		</div>
	);
}
