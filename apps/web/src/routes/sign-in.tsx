import { SignInForm } from "@/components/auth/sign-in-form";
import { useSession } from "@/lib/auth-client";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/sign-in")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: session } = useSession();
	const navigate = useNavigate({ from: Route.fullPath });

	useEffect(() => {
		if (session) {
			navigate({ to: "/guestbook" });
		}
	}, [session, navigate]);

	// No need to check isPending here since AuthGuard handles that
	if (session) {
		return null;
	}

	return (
		<div className="container mx-auto w-full min-w-0 max-w-[90vw] px-3 py-2 sm:max-w-2xl sm:px-4 md:max-w-3xl">
			<SignInForm />
		</div>
	);
}
