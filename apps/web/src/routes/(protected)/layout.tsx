import { Loader } from "@/components/navbar/loader";
import { authClient } from "@/lib/auth-client";
import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)")({
	component: Layout,
});

function Layout() {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		return <Loader />;
	}

	if (!session?.user) {
		return <Navigate to="/sign-in" />;
	}

	return <Outlet />;
}
