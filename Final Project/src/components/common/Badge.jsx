import { cn } from '../../utils/cn';

const VARIANT_STYLES = {
  neutral: 'bg-paper text-ink-muted',
  accent: 'bg-accent-soft text-accent-dark',
  success: 'bg-success-soft text-success',
  danger: 'bg-danger-soft text-danger',
};

export function Badge({ variant = 'neutral', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        VARIANT_STYLES[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
