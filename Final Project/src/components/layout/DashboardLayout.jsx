import { NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, StickyNote, UserCircle, ArrowLeft } from 'lucide-react';
import { AsyncBoundary } from '../ui/AsyncBoundary';
import { cn } from '../../utils/cn';

const DASHBOARD_LINKS = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/notes', label: 'Notes', icon: StickyNote, end: false },
  { to: '/dashboard/profile', label: 'Profile', icon: UserCircle, end: false },
];

export function DashboardLayout() {
  const linkClassName = ({ isActive }) =>
    cn(
      'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
      isActive ? 'bg-accent-soft text-accent-dark' : 'text-ink-muted hover:bg-paper hover:text-ink'
    );

  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-4 py-8">
      <aside className="w-48 shrink-0">
        <nav className="flex flex-col gap-1">
          {DASHBOARD_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClassName}>
              <link.icon size={16} />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/" className="mt-6 flex items-center gap-2 text-sm text-ink-muted hover:text-ink">
          <ArrowLeft size={14} /> Back to store
        </Link>
      </aside>
      <div className="flex-1">
        <AsyncBoundary>
          <Outlet />
        </AsyncBoundary>
      </div>
    </div>
  );
}
