import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { CirclePlay, Upload, Layout, TrendingUp, MapPin } from "lucide-react";
import { StoryCircles } from "@/components/story-circles";
import { VenueCard } from "@/components/venue-card";
import { mockVenues } from "@/lib/mock-data";

export default function Home() {
  const trendingVenues = mockVenues.slice(0, 2);
  const featuredVenue = mockVenues[0];

  return (
    <div className="max-w-md mx-auto bg-background min-h-[100dvh]">
      <div className="px-4 pt-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold">Showey</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-3 h-3 mr-1" />
              New York, NY
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/upload">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Link>
          </Button>
        </div>

        {/* Story Circles */}
        <StoryCircles />

        {/* Featured Venue */}
        {featuredVenue && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Featured Venue</h2>
              <Button variant="ghost" size="sm" className="text-sm" asChild>
                <Link href="/venue/1">
                  View All
                  <TrendingUp className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
            <VenueCard venue={featuredVenue} />
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <Card className="p-4 hover-card glass-effect">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h2 className="text-sm font-semibold">Quick Upload</h2>
                <p className="text-xs text-muted-foreground">Share instantly</p>
              </div>
              <Link href="/upload" className="w-full">
                <Button className="w-full" size="sm" variant="secondary">
                  Start
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-4 hover-card glass-effect">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CirclePlay className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h2 className="text-sm font-semibold">Live Feed</h2>
                <p className="text-xs text-muted-foreground">Watch displays</p>
              </div>
              <Link href="/venue/1" className="w-full">
                <Button className="w-full" size="sm" variant="secondary">
                  View
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Trending Venues */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Trending Now</h2>
            <Button variant="ghost" size="sm" className="text-sm" asChild>
              <Link href="/venues">
                See All
                <Layout className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {trendingVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} variant="compact" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}