import AuthLayout from "../../components/input-components/AuthLayout";
import { useState } from "react";
import { RegisterFormType } from "../../lib/validation/register.schema";
import { useAuthorization } from "../../hooks/useAuthorization";
import AuthForm from "../../components/AuthForm";

export default function Register() {
	const [formData, setFormData] = useState<RegisterFormType>({ name: "", email: "", password: "" });
	const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormType, string>>>({});
	const { handleSubmit, isPending } = useAuthorization({ mode: "register" });

	return (
		<AuthLayout subtitle="Create your new account.">
			<AuthForm
				formData={formData}
				setFormData={setFormData}
				errors={errors}
				setErrors={setErrors}
				handleSubmit={handleSubmit}
				isPending={isPending}
				mode="register"
			/>
		</AuthLayout>
	);
}
