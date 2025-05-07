import { Guestbook } from "@/components/guestbook";
import { useSession } from "@/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/guestbook")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: session, isPending } = useSession();

	const navigate = Route.useNavigate();

	useEffect(() => {
		if (!session && !isPending) {
			navigate({
				to: "/sign-in",
			});
		}
	}, [session, isPending, navigate]);

	return (
		<div className="container mx-auto w-full min-w-0 max-w-[90vw] px-3 py-2 sm:max-w-2xl sm:px-4 md:max-w-3xl">
			<Guestbook />
		</div>
	);
}
