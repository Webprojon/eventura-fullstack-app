export interface UserType {
	_id: string;
	name: string;
	email: string;
	image: string;
}

export interface EventTypes {
	_id: string;
	eventTitle: string;
	name: string;
	eventDate: string;
	eventTime: string;
	eventCity: string;
	eventAvenue: string;
	eventParticipants: UserType[];
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

export interface FollowType {
	_id: string;
	name: string;
	image: string;
}

// Auth types
export interface AuthLayoutProps {
	subtitle: string;
	children: React.ReactNode;
}

export interface AuthUserType {
	name?: string;
	email: string;
	password: string;
}

type Mode = "login" | "register";

export interface UseAuthorizationProps {
	mode: Mode;
}

export interface AuthFormProps<T> {
	formData: T;
	setFormData: React.Dispatch<React.SetStateAction<T>>;
	errors: Partial<Record<keyof T, string>>;
	setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof T, string>>>>;
	handleSubmit: (e: React.FormEvent, data: T, setErrors: AuthFormProps<T>["setErrors"]) => void;
	isPending: boolean;
	mode: "login" | "register";
}
