import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - District Not Found</h1>
      <p className="text-xl mb-8">
        Sorry, the district you're looking for doesn't exist in our database.
      </p>
      <Link href="/">
        <Button>
          <Home className="mr-2 h-4 w-4" />
          Return Home
        </Button>
      </Link>
    </div>
  );
}