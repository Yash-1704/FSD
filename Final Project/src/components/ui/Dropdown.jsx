import { useRef } from 'react';
import { useToggle } from '../../hooks/useToggle';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { cn } from '../../utils/cn';

export function Dropdown({ trigger, children, align = 'right' }) {
  const [isOpen, { toggle, setFalse }] = useToggle(false);
  const containerRef = useRef(null);
  useOnClickOutside(containerRef, setFalse);

  return (
    <div ref={containerRef} className="relative">
      <div onClick={toggle}>{trigger}</div>
      {isOpen && (
        <div
          onClick={setFalse}
          className={cn(
            'absolute top-full z-40 mt-2 w-48 rounded-md border border-border bg-surface py-1 shadow-lg',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
