"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

const venues = [
  { id: 1, name: "Times Square", image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=400&fit=crop" },
  { id: 2, name: "Central Park", image: "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=400&h=400&fit=crop" },
  { id: 3, name: "Broadway", image: "https://images.unsplash.com/photo-1531175946669-075d40086c48?w=400&h=400&fit=crop" },
  { id: 4, name: "Soho", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&h=400&fit=crop" },
  { id: 5, name: "5th Ave", image: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=400&h=400&fit=crop" },
];

export function StoryCircles() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
      {venues.map((venue, i) => (
        <Link 
          key={venue.id}
          href={`/venue/${venue.id}`}
          className="flex flex-col items-center gap-1.5 min-w-[72px]"
        >
          <div className={cn(
            "w-[72px] h-[72px] rounded-full p-[3px]",
            "bg-gradient-to-tr from-rose-500 to-indigo-500"
          )}>
            <div className="rounded-full overflow-hidden w-full h-full border-2 border-background">
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <span className="text-xs text-center font-medium truncate w-full">
            {venue.name}
          </span>
        </Link>
      ))}
    </div>
  );
}