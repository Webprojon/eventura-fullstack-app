import { Link } from "react-router-dom";
import AuthLayout from "../../components/input-components/AuthLayout";
import Input from "../../components/input-components/Input";
import { useState } from "react";
import { RegisterFormType } from "../../lib/validation/register.schema";
import Loader from "../../components/Loader";
import { useAuthorization } from "../../hooks/useAuthorization";

export default function Register() {
	const [formData, setFormData] = useState<RegisterFormType>({ name: "", email: "", password: "" });
	const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormType, string>>>({});
	const { handleSubmit, isPending } = useAuthorization({ mode: "register" });

	return (
		<AuthLayout subtitle="Create your new account.">
			<form onSubmit={(e) => handleSubmit(e, formData, setErrors)} className="w-[350px] flex gap-y-7 flex-col flex-2">
				<div className="flex flex-col gap-y-2">
					<Input
						type="text"
						name="username"
						id="username"
						text="Name"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					/>
					{errors.name && <span className="text-[11px] tracking-wider text-red-400">{errors.name}</span>}
				</div>
				<div className="flex flex-col gap-y-2">
					<Input
						type="email"
						name="email"
						id="email"
						text="Email"
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					/>
					{errors.email && <span className="text-[11px] tracking-wider text-red-400">{errors.email}</span>}
				</div>
				<div className="flex flex-col gap-y-2">
					<Input
						type="password"
						name="password"
						id="password"
						text="Password"
						value={formData.password}
						onChange={(e) => setFormData({ ...formData, password: e.target.value })}
					/>
					{errors.password && <span className="text-[12px] tracking-wider text-red-400">{errors.password}</span>}
					<span className="text-slate-400 text-[13px] mt-2">
						Have an account?{" "}
						<Link to="/sign-in" className="font-medium text-sky-300">
							Log in now
						</Link>
					</span>
				</div>
				<button type="submit" className="flex justify-center items-center py-3 sm:py-2 px-4 btn" disabled={isPending}>
					{isPending ? <Loader className="w-6 h-6" /> : "Sign up"}
				</button>
			</form>
		</AuthLayout>
	);
}
