"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";

export const ThemeToggle = () => {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark";
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-10 h-10 p-0 rounded-full"
            aria-label="테마 전환"
        >
            {theme === "light" ? (
                <span className="text-xl" role="img" aria-label="dark-mode">🌙</span>
            ) : (
                <span className="text-xl" role="img" aria-label="light-mode">☀️</span>
            )}
        </Button>
    );
};
