import { Link } from "react-router-dom";
import AuthLayout from "../../components/input-components/AuthLayout";
import Input from "../../components/input-components/Input";
import { useState } from "react";
import { LoginFormType } from "../../lib/validation/login.schema";
import Loader from "../../components/Loader";
import { useAuthorization } from "../../hooks/useAuthorization";

export default function Login() {
	const [formData, setFormData] = useState<LoginFormType>({ email: "", password: "" });
	const [errors, setErrors] = useState<Partial<Record<keyof LoginFormType, string>>>({});
	const { handleSubmit, isPending } = useAuthorization({ mode: "login" });

	return (
		<AuthLayout subtitle="Log in to your account.">
			<form onSubmit={(e) => handleSubmit(e, formData, setErrors)} className="w-[350px] flex gap-y-8 flex-col flex-2">
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
					{errors.password && <span className="text-[11px] tracking-wider text-red-400">{errors.password}</span>}
					<span className="text-slate-400 text-[13px] mt-2">
						Don't have an account?{" "}
						<Link to="/sign-up" className="font-medium text-sky-300">
							Create account
						</Link>
					</span>
				</div>
				<button type="submit" className="flex justify-center items-center py-3 sm:py-2 px-4 btn">
					{isPending ? <Loader className="w-6 h-6" /> : "Sign in"}
				</button>
			</form>
		</AuthLayout>
	);
}
