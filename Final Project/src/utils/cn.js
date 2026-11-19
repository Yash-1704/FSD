// Joins conditional class names together, skipping falsy values.
// Example: cn('rounded-md', isActive && 'bg-accent') -> 'rounded-md bg-accent' or just 'rounded-md'
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
