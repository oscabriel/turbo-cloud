import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import cloudflareLogo from "/Cloudflare_Logo.svg";
import reactLogo from "/react.svg";
import viteLogo from "/vite.svg";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("unknown");

	return (
		<div className="container mx-auto max-w-4xl px-4 py-10">
			<div className="mb-4 flex justify-end">
				<ThemeToggle />
			</div>

			<div className="mb-6 flex items-center justify-center gap-6">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<a
								href="https://vite.dev"
								target="_blank"
								rel="noreferrer"
								className="transition-opacity hover:opacity-80"
							>
								<img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
							</a>
						</TooltipTrigger>
						<TooltipContent>
							<p>Vite: Next Generation Frontend Tooling</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<a
								href="https://react.dev"
								target="_blank"
								rel="noreferrer"
								className="transition-opacity hover:opacity-80"
							>
								<img src={reactLogo} className="h-16 w-16" alt="React logo" />
							</a>
						</TooltipTrigger>
						<TooltipContent>
							<p>React: A JavaScript library for building user interfaces</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<a
								href="https://workers.cloudflare.com/"
								target="_blank"
								rel="noreferrer"
								className="transition-opacity hover:opacity-80"
							>
								<img
									src={cloudflareLogo}
									className="h-32 w-32"
									alt="Cloudflare logo"
								/>
							</a>
						</TooltipTrigger>
						<TooltipContent>
							<p>Cloudflare Workers: Serverless execution environment</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			<h1 className="mb-4 text-center font-bold text-4xl text-primary">
				Vite + React + Cloudflare
			</h1>
			<p className="mb-8 text-center text-muted-foreground">
				A modern web development stack
			</p>

			<Separator className="my-8" />

			<div className="grid gap-6 md:grid-cols-2">
				<Card className="shadow-md transition-shadow hover:shadow-lg">
					<CardHeader>
						<CardTitle>Counter Example</CardTitle>
						<CardDescription>
							Try clicking the button to update the count
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-center">
							<Button
								onClick={() => setCount((count) => count + 1)}
								aria-label="increment"
								size="lg"
								className="w-full sm:w-auto"
							>
								Count is {count}
							</Button>
						</div>
					</CardContent>
					<CardFooter className="flex-col items-start">
						<p className="text-muted-foreground text-sm">
							Edit{" "}
							<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
								src/App.tsx
							</code>{" "}
							and save to test HMR
						</p>
					</CardFooter>
				</Card>

				<Card className="shadow-md transition-shadow hover:shadow-lg">
					<CardHeader>
						<CardTitle>API Integration</CardTitle>
						<CardDescription>
							Fetch data from your Cloudflare Worker
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-center">
							<Button
								onClick={() => {
									fetch("/api/")
										.then((res) => res.json() as Promise<{ name: string }>)
										.then((data) => setName(data.name));
								}}
								aria-label="get name"
								variant="secondary"
								size="lg"
								className="w-full sm:w-auto"
							>
								Name from API is: {name}
							</Button>
						</div>
					</CardContent>
					<CardFooter className="flex-col items-start">
						<p className="text-muted-foreground text-sm">
							Edit{" "}
							<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
								apps/server/src/index.ts
							</code>{" "}
							to change the name
						</p>
					</CardFooter>
				</Card>
			</div>

			<Separator className="my-8" />

			<footer className="text-center text-muted-foreground text-sm">
				<p className="mb-4">
					Click on the logos above to learn more about each technology
				</p>
				<p className="text-xs">
					Built with Vite, React, and Cloudflare Workers
				</p>
			</footer>
		</div>
	);
}
