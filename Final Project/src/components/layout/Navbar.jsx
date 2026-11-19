import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Package, Heart, ShoppingCart, Sun, Moon, Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { useToggle } from '../../hooks/useToggle';
import { Dropdown } from '../ui/Dropdown';
import { Badge } from '../common/Badge';
import { cn } from '../../utils/cn';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products', end: false },
];

// `onOpenCart` is passed down from MainLayout rather than this component
// owning cart-open state itself — the drawer it opens is a sibling
// rendered by MainLayout, not a child of Navbar, so the state that
// controls both has to live above them (lifting state up).
export function Navbar({ onOpenCart }) {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMobileOpen, { toggle: toggleMobile, setFalse: closeMobile }] = useToggle(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const linkClassName = ({ isActive }) =>
    cn('text-sm font-medium transition-colors', isActive ? 'text-accent' : 'text-ink-muted hover:text-ink');

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <Package className="text-accent" size={22} />
          <span className="font-display text-lg font-semibold text-ink">Crate</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClassName}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-md p-2 text-ink-muted hover:bg-paper hover:text-ink"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <Link to="/wishlist" aria-label="Wishlist" className="relative rounded-md p-2 text-ink-muted hover:bg-paper hover:text-ink">
            <Heart size={18} />
            {wishlistItems.length > 0 && (
              <Badge variant="danger" className="absolute -right-1 -top-1 h-4 min-w-4 justify-center px-1">
                {wishlistItems.length}
              </Badge>
            )}
          </Link>

          <button
            onClick={onOpenCart}
            aria-label="Open cart"
            className="relative rounded-md p-2 text-ink-muted hover:bg-paper hover:text-ink"
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <Badge variant="accent" className="absolute -right-1 -top-1 h-4 min-w-4 justify-center px-1">
                {totalItems}
              </Badge>
            )}
          </button>

          <div className="hidden md:block">
            {user ? (
              <Dropdown
                trigger={
                  <button className="flex items-center gap-2 rounded-md border border-border px-2 py-1.5">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="" className="h-6 w-6 rounded-full object-cover" />
                    ) : (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent-dark">
                        {user.name?.[0]?.toUpperCase()}
                      </span>
                    )}
                    <span className="text-sm font-medium text-ink">{user.name}</span>
                  </button>
                }
              >
                <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-paper">
                  <LayoutDashboard size={14} /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-danger hover:bg-paper"
                >
                  <LogOut size={14} /> Log out
                </button>
              </Dropdown>
            ) : (
              <Link
                to="/login"
                className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-dark"
              >
                Log in
              </Link>
            )}
          </div>

          <button
            onClick={toggleMobile}
            aria-label="Toggle menu"
            className="rounded-md p-2 text-ink-muted hover:bg-paper md:hidden"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} onClick={closeMobile} className={linkClassName}>
              {link.label}
            </NavLink>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" onClick={closeMobile} className="py-1 text-sm text-ink-muted hover:text-ink">
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  closeMobile();
                }}
                className="py-1 text-left text-sm text-danger"
              >
                Log out
              </button>
            </>
          ) : (
            <Link to="/login" onClick={closeMobile} className="py-1 text-sm text-accent">
              Log in
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
