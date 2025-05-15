import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().email("Email didn't match, try again"),
	password: z.string().min(6, "Password didn't match, try again"),
});

export type LoginFormType = z.infer<typeof LoginSchema>;
