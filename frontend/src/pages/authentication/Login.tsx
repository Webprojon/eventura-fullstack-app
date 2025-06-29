import AuthLayout from "../../components/input-components/AuthLayout";
import { useState } from "react";
import { LoginFormType } from "../../lib/validation/login.schema";
import { useAuthorization } from "../../hooks/useAuthorization";
import AuthForm from "../../components/AuthForm";

export default function Login() {
	const [formData, setFormData] = useState<LoginFormType>({ email: "", password: "" });
	const [errors, setErrors] = useState<Partial<Record<keyof LoginFormType, string>>>({});
	const { handleSubmit, isPending } = useAuthorization({ mode: "login" });

	return (
		<AuthLayout subtitle="Log in to your account.">
			<AuthForm
				formData={formData}
				setFormData={setFormData}
				errors={errors}
				setErrors={setErrors}
				handleSubmit={handleSubmit}
				isPending={isPending}
				mode="login"
			/>
		</AuthLayout>
	);
}
