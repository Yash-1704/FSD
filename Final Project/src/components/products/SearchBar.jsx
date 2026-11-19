import { useRef } from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar({ value, onChange, placeholder = 'Search products…' }) {
  const inputRef = useRef(null);

  const handleClear = () => {
    onChange('');
    // Returns focus to the field after clearing it — a small touch, but
    // without this the user's cursor is left nowhere after the click.
    inputRef.current?.focus();
  };

  return (
    <div className="relative flex-1">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-9 text-sm text-ink outline-none focus:border-accent"
      />
      {value && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
