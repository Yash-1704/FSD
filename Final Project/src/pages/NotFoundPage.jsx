import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { Button } from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
      <Compass size={32} className="text-ink-faint" />
      <h1 className="font-display text-2xl font-semibold text-ink">Page not found</h1>
      <p className="text-sm text-ink-muted">The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button className="mt-2">Back home</Button>
      </Link>
    </div>
  );
}
