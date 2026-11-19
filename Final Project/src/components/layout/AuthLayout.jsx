import { Outlet, Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { AsyncBoundary } from '../ui/AsyncBoundary';

export function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-ink p-10 text-paper lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <Package size={22} className="text-accent" />
          <span className="font-display text-lg font-semibold">Crate</span>
        </Link>
        <div>
          <h1 className="font-display text-3xl font-semibold leading-tight">
            Everything you need, packed in one place.
          </h1>
          <p className="mt-3 max-w-sm text-sm text-paper/70">
            Sign in to track your wishlist, manage your cart, and pick up your notes right where you left off.
          </p>
        </div>
        <p className="text-xs text-paper/50">A frontend demo — no real accounts are created on a server.</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <Package size={22} className="text-accent" />
            <span className="font-display text-lg font-semibold text-ink">Crate</span>
          </Link>
          <AsyncBoundary>
            <Outlet />
          </AsyncBoundary>
        </div>
      </div>
    </div>
  );
}
