import { Loader } from "@/components/navbar/loader";
import { authClient } from "@/lib/auth-client";
import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
	component: Layout,
});

function Layout() {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		return <Loader />;
	}

	if (!session?.user) {
		return <Outlet />;
	}

	return <Navigate to="/" />;
}
