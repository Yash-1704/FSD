import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

// forwardRef matters here: a parent occasionally needs the *actual* <input>
// DOM node (to call .focus() on it, for instance — see NoteForm), not just
// this wrapper component. Without forwardRef, a ref passed to <Input>
// would attach to nothing, since React doesn't let a plain function
// component receive `ref` as a normal prop.
export const Input = forwardRef(function Input({ label, error, className, id, name, ...props }, ref) {
  // Falls back to `name` when `id` isn't given — every form field already
  // has a `name`, and without *some* id, htmlFor/id below have nothing to
  // link, which breaks screen-reader label association silently (the
  // label and input still look connected visually, so this is easy to miss).
  const inputId = id ?? name;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        name={name}
        className={cn(
          'rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent',
          error && 'border-danger',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
});
