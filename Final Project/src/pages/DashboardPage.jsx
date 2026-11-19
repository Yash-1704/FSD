import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, StickyNote, Bug } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Button } from '../components/common/Button';
import { STORAGE_KEYS } from '../utils/constants';
import { formatDate } from '../utils/formatters';

// Reads notes just to get a count for this card. NotesPage owns the actual
// reducer for writes — this only ever needs a read, so it isn't worth
// wiring up the reducer here too.
function useNotesCount() {
  const [notes] = useLocalStorage(STORAGE_KEYS.NOTES, []);
  return notes;
}

// Throws on purpose when `crash` is true. Exists only to demonstrate that
// an error boundary placed around ONE widget contains the failure to that
// widget, instead of taking down the rest of the dashboard.
function BuggyWidget({ crash }) {
  if (crash) {
    throw new Error('Simulated widget crash');
  }
  return <p className="text-sm text-ink-muted">This widget is healthy.</p>;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const notes = useNotesCount();
  const [shouldCrash, setShouldCrash] = useState(false);

  const notesSummary = useMemo(
    () => ({
      total: notes.length,
      completed: notes.filter((note) => note.completed).length,
    }),
    [notes]
  );

  const stats = [
    { icon: ShoppingCart, label: 'Items in cart', value: cartItems.length, to: null },
    { icon: Heart, label: 'Wishlist items', value: wishlistItems.length, to: '/wishlist' },
    {
      icon: StickyNote,
      label: 'Notes',
      value: `${notesSummary.completed}/${notesSummary.total} done`,
      to: '/dashboard/notes',
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Welcome back, {user.name}</h1>
      <p className="mt-1 text-sm text-ink-muted">Member since {formatDate(user.joinedAt)}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const content = (
            <div className="rounded-lg border border-border bg-surface p-5">
              <stat.icon className="text-accent" size={20} />
              <p className="mt-3 text-lg font-semibold text-ink">{stat.value}</p>
              <p className="text-sm text-ink-muted">{stat.label}</p>
            </div>
          );
          return stat.to ? (
            <Link key={stat.label} to={stat.to}>
              {content}
            </Link>
          ) : (
            <div key={stat.label}>{content}</div>
          );
        })}
      </div>

      <div className="mt-8 rounded-lg border border-border bg-surface p-5">
        <div className="mb-3 flex items-center gap-2">
          <Bug size={16} className="text-ink-muted" />
          <h2 className="font-medium text-ink">Developer playground</h2>
        </div>
        <p className="mb-3 text-sm text-ink-muted">
          This card is wrapped in its own error boundary — crashing it won't take down the rest of the
          dashboard.
        </p>
        <ErrorBoundary message="This widget crashed on purpose." onReset={() => setShouldCrash(false)}>
          <BuggyWidget crash={shouldCrash} />
        </ErrorBoundary>
        {!shouldCrash && (
          <Button variant="outline" size="sm" className="mt-3" onClick={() => setShouldCrash(true)}>
            Simulate crash
          </Button>
        )}
      </div>
    </div>
  );
}
