"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, Users, MapPin } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface VenueCardProps {
  venue: any;
  variant?: "default" | "compact";
}

export function VenueCard({ venue, variant = "default" }: VenueCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/venue/${venue.id.split('-')[1]}`}>
        <Card className="overflow-hidden hover:shadow-lg transition-all">
          <div className="relative aspect-square">
            <img
              src={venue.image}
              alt={venue.name}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 p-3 text-white">
              <h3 className="font-semibold text-sm">{venue.name}</h3>
              <p className="text-xs text-white/80">{venue.location}</p>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/venue/${venue.id.split('-')[1]}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all">
        <div className="relative aspect-video">
          <img
            src={venue.image}
            alt={venue.name}
            className="object-cover w-full h-full"
          />
          <Badge 
            className="absolute top-2 right-2" 
            variant={venue.currentMedia ? "default" : "secondary"}
          >
            {venue.currentMedia ? "Live" : "Available"}
          </Badge>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold">{venue.name}</h3>
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="w-3 h-3 mr-1" />
                {venue.location}
              </div>
            </div>
            <Badge variant="outline">${venue.price}</Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            {venue.description}
          </p>

          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Eye className="w-3 h-3 mr-1" />
              {(venue.stats.dailyViews / 1000).toFixed(0)}k views
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="w-3 h-3 mr-1" />
              {venue.stats.activeDisplays} today
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users className="w-3 h-3 mr-1" />
              {venue.stats.queueLength} in queue
            </div>
          </div>

          {venue.currentMedia && (
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Currently displaying:
                <span className="ml-1 text-foreground">
                  {formatDistanceToNow(new Date(venue.currentMedia.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}