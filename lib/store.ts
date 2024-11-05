import { create } from 'zustand';

interface Media {
  id: string;
  url: string;
  type: 'photo' | 'video';
  duration?: number;
  userId: string;
  venueId: string;
  status: 'pending' | 'approved' | 'displaying';
}

interface MediaStore {
  currentMedia: Media | null;
  uploadProgress: number;
  uploadMedia: (file: File) => Promise<void>;
  resetMedia: () => void;
}

export const useMediaStore = create<MediaStore>((set) => ({
  currentMedia: null,
  uploadProgress: 0,
  uploadMedia: async (file: File) => {
    // Mock upload progress
    for (let i = 0; i <= 100; i += 10) {
      set({ uploadProgress: i });
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Mock successful upload
    set({
      currentMedia: {
        id: 'media-1',
        url: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'photo' : 'video',
        userId: 'user-1',
        venueId: 'venue-1',
        status: 'pending'
      },
      uploadProgress: 0
    });
  },
  resetMedia: () => set({ currentMedia: null, uploadProgress: 0 })
}));