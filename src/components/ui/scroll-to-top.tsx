"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollableHeight = documentHeight - windowHeight;

      const progress =
        scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

      setScrollProgress(Math.min(progress, 100));
      setVisible(scrollTop > 200);
    };

    handleScroll(); 
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <svg className="absolute inset-0 w-12 h-12 -rotate-90" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="hsl(var(--muted))"
            strokeWidth="4"
            fill="transparent"
            className="opacity-20"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 20}`}
            strokeDashoffset={`${
              2 * Math.PI * 20 * (1 - scrollProgress / 100)
            }`}
            className="transition-all duration-150 ease-out"
          />
        </svg>

        <Button
          onClick={scrollToTop}
          size="icon"
          aria-label="Voltar ao topo"
          variant="default"
          className={cn(
            "w-12 h-12 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105",
            "bg-background border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
            visible ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"
          )}
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
