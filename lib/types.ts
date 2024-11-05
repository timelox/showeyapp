export interface Media {
  id: string;
  url: string;
  type: 'photo' | 'video';
  duration?: number;
  userId: string;
  venueId: string;
  status: 'pending' | 'approved' | 'displaying';
}

export interface Venue {
  id: string;
  name: string;
  currentMedia: Media | null;
  queue: Media[];
}

export interface PaymentIntent {
  id: string;
  amount: number;
  status: 'pending' | 'completed';
  mediaId: string;
}