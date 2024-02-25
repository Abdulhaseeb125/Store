import { useTheme } from "@/components/themeControls/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

export function ModeToggle() {
  const theme = useTheme();
  function toggleTheme() {
    let current = theme.theme;
    if (current === "dark") theme.setTheme("light");
    else theme.setTheme("dark");
  }
  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      className="rounded-full transition hidden md:flex justify-center"
      onClick={toggleTheme}
    >
      {theme.theme == "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}
