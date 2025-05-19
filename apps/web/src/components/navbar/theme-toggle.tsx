import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
			<Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
			<Moon className="hidden h-5 w-5 dark:block" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
