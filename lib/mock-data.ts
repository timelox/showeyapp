export const mockVenues = [
  {
    id: "venue-1",
    name: "Times Square Billboard",
    description: "The most iconic digital billboard in NYC",
    location: "Manhattan, NY",
    type: "Billboard",
    price: 5,
    currentMedia: {
      id: "media-1",
      url: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800",
      type: "photo",
      userId: "user-1",
      venueId: "venue-1",
      status: "displaying",
      createdAt: new Date().toISOString()
    },
    stats: {
      dailyViews: 150000,
      activeDisplays: 24,
      queueLength: 8
    },
    queue: [
      {
        id: "media-2",
        url: "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=800",
        type: "photo",
        userId: "user-2",
        venueId: "venue-1",
        status: "pending",
        createdAt: new Date().toISOString()
      }
    ],
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=400&fit=crop"
  },
  {
    id: "venue-2",
    name: "Central Park Display",
    description: "Digital display at Central Park's main entrance",
    location: "Central Park, NY",
    type: "Interactive Display",
    price: 3,
    currentMedia: null,
    stats: {
      dailyViews: 75000,
      activeDisplays: 12,
      queueLength: 3
    },
    queue: [],
    image: "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=400&h=400&fit=crop"
  },
  {
    id: "venue-3",
    name: "Broadway Lights",
    description: "Premium display on Broadway's theater district",
    location: "Theater District, NY",
    type: "LED Wall",
    price: 4,
    currentMedia: null,
    stats: {
      dailyViews: 100000,
      activeDisplays: 18,
      queueLength: 5
    },
    queue: [],
    image: "https://images.unsplash.com/photo-1531175946669-075d40086c48?w=400&h=400&fit=crop"
  }
];