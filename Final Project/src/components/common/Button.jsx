import { cn } from '../../utils/cn';

const VARIANT_STYLES = {
  primary: 'bg-accent text-white hover:bg-accent-dark',
  secondary: 'bg-ink text-paper hover:opacity-90',
  outline: 'border border-border text-ink hover:bg-paper',
  ghost: 'text-ink hover:bg-paper',
  danger: 'bg-danger text-white hover:opacity-90',
};

const SIZE_STYLES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({ variant = 'primary', size = 'md', className, children, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
