import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex gap-3 border-b border-border py-4">
      <img
        src={item.image}
        alt={item.title}
        className="h-16 w-16 shrink-0 rounded-md border border-border bg-white object-contain p-1"
      />
      <div className="flex flex-1 flex-col gap-1">
        <p className="line-clamp-1 text-sm font-medium text-ink">{item.title}</p>
        <p className="text-sm text-ink-muted">{formatCurrency(item.price)}</p>
        <div className="mt-auto flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            aria-label="Decrease quantity"
            className="rounded-md border border-border p-1 hover:bg-paper"
          >
            <Minus size={12} />
          </button>
          <span className="w-6 text-center text-sm">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            aria-label="Increase quantity"
            className="rounded-md border border-border p-1 hover:bg-paper"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        aria-label="Remove item"
        className="self-start text-ink-faint hover:text-danger"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
