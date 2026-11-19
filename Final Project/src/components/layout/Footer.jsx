import { Package } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Package size={16} className="text-accent" />
          <span className="font-display font-medium text-ink">Crate</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Crate. A frontend demo — no real orders are placed.</p>
      </div>
    </footer>
  );
}
