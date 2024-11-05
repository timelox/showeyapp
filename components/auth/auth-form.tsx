"use client";

import { useState } from 'react';
import { useAuthStore } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp } = useAuthStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signIn(email, password);
        toast({
          title: "Success",
          description: "Successfully signed in",
        });
      } else {
        await signUp(email, password);
        toast({
          title: "Success",
          description: "Account created successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Authentication failed",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {isLogin ? 'Sign In' : 'Sign Up'}
      </Button>
      <Button
        type="button"
        variant="ghost"
        className="w-full"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
      </Button>
    </form>
  );
}