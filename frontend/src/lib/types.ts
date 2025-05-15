export interface ParticipantType {
	_id: string;
	img: string;
	name: string;
}

interface UserType {
	_id: string;
	name: string;
	email: string;
}

export interface EventTypes {
	_id: string;
	organiserImg: string;
	eventTitle: string;
	name: string;
	eventDate: string;
	eventTime: string;
	eventCity: string;
	eventAvenue: string;
	eventParticipants: ParticipantType[];
	eventDescription: string;
	user: UserType;
}

export interface EventFormData {
	eventTitle: string;
	eventCategory: string;
	eventCity: string;
	eventAvenue: string;
	eventDate: string;
	eventTime: string;
	eventDescription: string;
}

export interface AuthLayoutProps {
	subtitle: string;
	children: React.ReactNode;
}

export interface AuthUserType {
	name?: string;
	email: string;
	password: string;
}

export interface InputProps {
	id: string;
	name: string;
	type: string;
	text: string;
	className?: string;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ConfirmationModalProps {
	message: string;
	onCancel: () => void;
	onConfirm: () => void;
}
