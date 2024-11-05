"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Media } from "@/lib/types";
import { Clock, Users, Eye, Upload } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface VenueDisplayProps {
  venue: {
    id: string;
    name: string;
    description: string;
    location: string;
    type: string;
    price: number;
    stats: {
      dailyViews: number;
      activeDisplays: number;
      queueLength: number;
    };
    currentMedia: Media | null;
    queue: Media[];
  };
}

export function VenueDisplay({ venue }: VenueDisplayProps) {
  return (
    <div className="space-y-6 p-4">
      {/* Venue Info */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Badge variant="outline" className="mb-2">
              {venue.type}
            </Badge>
            <p className="text-sm text-muted-foreground">
              {venue.description}
            </p>
          </div>
          <Badge variant="secondary" className="text-lg">
            ${venue.price}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4 border-y">
          <div className="text-center">
            <div className="text-2xl font-semibold">
              {(venue.stats.dailyViews / 1000).toFixed(0)}k
            </div>
            <div className="text-xs text-muted-foreground">Daily Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold">
              {venue.stats.activeDisplays}
            </div>
            <div className="text-xs text-muted-foreground">Active Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold">
              {venue.stats.queueLength}
            </div>
            <div className="text-xs text-muted-foreground">In Queue</div>
          </div>
        </div>

        <div className="mt-4">
          <Link href="/upload">
            <Button className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Upload Media
            </Button>
          </Link>
        </div>
      </Card>

      {/* Current Display */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Current Display</h2>
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <Badge variant={venue.currentMedia ? "default" : "secondary"}>
              {venue.currentMedia ? "Live" : "Available"}
            </Badge>
          </div>
        </div>
        
        {venue.currentMedia ? (
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              {venue.currentMedia.type === 'photo' ? (
                <img
                  src={venue.currentMedia.url}
                  alt="Current display"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={venue.currentMedia.url}
                  controls
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Started {formatDistanceToNow(new Date(venue.currentMedia.createdAt), { addSuffix: true })}</span>
              <Badge variant="outline">{venue.currentMedia.type}</Badge>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">No media currently displaying</p>
          </div>
        )}
      </Card>

      {/* Queue */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Queue</h2>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-1" />
            <span>{venue.queue.length} items</span>
          </div>
        </div>
        
        {venue.queue.length > 0 ? (
          <div className="space-y-4">
            {venue.queue.map((media, index) => (
              <div 
                key={media.id} 
                className="p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Queue Position #{index + 1}</p>
                    <p className="text-sm text-muted-foreground">
                      Added {formatDistanceToNow(new Date(media.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  <Badge variant="outline">{media.type}</Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Queue is empty</p>
            <Link href="/upload">
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Media
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}