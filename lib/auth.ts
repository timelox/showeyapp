import { auth } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { create } from 'zustand';

interface AuthStore {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  signIn: async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  },
  signUp: async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  },
  signOut: async () => {
    await firebaseSignOut(auth);
    set({ user: null });
  },
  setUser: (user: User | null) => set({ user, loading: false }),
}));

// Set up auth listener
if (typeof window !== 'undefined') {
  onAuthStateChanged(auth, (user) => {
    useAuthStore.getState().setUser(user);
  });
}