"use client";

import { Home, Upload, Layout, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Upload, label: "Upload", href: "/upload" },
  { icon: Layout, label: "Venues", href: "/venue/1" },
  { icon: User, label: "Profile", href: "/dashboard" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-effect h-14 border-t">
      <div className="max-w-md mx-auto h-full">
        <div className="flex h-full items-center justify-around px-4">
          {navItems.map(({ icon: Icon, label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 w-16 h-full relative",
                  "text-muted-foreground hover:text-foreground transition-colors",
                  isActive && "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:animate-in"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}