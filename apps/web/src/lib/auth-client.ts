import { emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	plugins: [emailOTPClient()],
	baseURL: import.meta.env.VITE_SERVER_URL,
});

export const { useSession, getSession, signIn, signOut } = authClient;
