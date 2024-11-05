import { AuthForm } from '@/components/auth/auth-form';
import { Card } from '@/components/ui/card';

export default function AuthPage() {
  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome to Showey
        </h1>
        <AuthForm />
      </Card>
    </div>
  );
}