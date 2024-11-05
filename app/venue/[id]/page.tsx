import { VenueDisplay } from "@/components/venue-display";
import { mockVenues } from "@/lib/mock-data";
import { ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return mockVenues.map((venue) => ({
    id: venue.id.split('-')[1]
  }));
}

export default function VenuePage({ params }: { params: { id: string } }) {
  const venue = mockVenues.find((v) => v.id === `venue-${params.id}`);

  if (!venue) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-center">Venue not found</h1>
      </div>
    );
  }

  return (
    <div className="animate-in">
      <header className="sticky top-0 z-40 glass-effect">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center rounded-lg w-8 h-8 hover:bg-accent"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="ml-3">
              <h1 className="text-lg font-semibold">{venue.name}</h1>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{venue.location}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <VenueDisplay venue={venue} />
    </div>
  );
}