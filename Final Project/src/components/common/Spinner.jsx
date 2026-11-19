import { cn } from '../../utils/cn';

export function Spinner({ size = 20, className }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('animate-spin rounded-full border-2 border-border border-t-accent', className)}
      style={{ width: size, height: size }}
    />
  );
}
