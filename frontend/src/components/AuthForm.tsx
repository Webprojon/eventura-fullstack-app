import Input from "./input-components/Input";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { AuthFormProps } from "../lib/types";
export default function AuthForm<T extends { email: string; password: string; name?: string }>({
	formData,
	setFormData,
	errors,
	setErrors,
	handleSubmit,
	isPending,
	mode,
}: AuthFormProps<T>) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const wrapperStyle = "flex flex-col gap-y-2";
	const errorStyle = "text-xs tracking-wider text-red-400";
	const isSignUp = mode === "register";
	const linkTo = isSignUp ? "/sign-in" : "/sign-up";
	const buttonText = isSignUp ? "Sign up" : "Sign in";
	const linkText = isSignUp ? "Log in now" : "Create account";

	return (
		<form onSubmit={(e) => handleSubmit(e, formData, setErrors)} className="w-86 flex gap-y-7 flex-col flex-2">
			{isSignUp && (
				<div className={wrapperStyle}>
					<Input type="text" name="name" id="name" text="Name" value={formData.name ?? ""} onChange={handleChange} />
					{errors.name && <span className={errorStyle}>{errors.name}</span>}
				</div>
			)}

			<div className={wrapperStyle}>
				<Input type="email" name="email" id="email" text="Email" value={formData.email} onChange={handleChange} />
				{errors.email && <span className={errorStyle}>{errors.email}</span>}
			</div>

			<div className={wrapperStyle}>
				<Input type="password" name="password" id="password" text="Password" value={formData.password} onChange={handleChange} />
				{errors.password && <span className={errorStyle}>{errors.password}</span>}
				<Link to={linkTo} className="text-xs text-sky-300 mt-2">
					Have an account? <strong>{linkText}</strong>
				</Link>
			</div>

			<button type="submit" className="flex justify-center items-center py-3 sm:py-2 px-4 btn" disabled={isPending}>
				{isPending ? <Loader className="w-6 h-6" /> : buttonText}
			</button>
		</form>
	);
}
