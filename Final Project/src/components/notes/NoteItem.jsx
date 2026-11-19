import { memo, useState } from 'react';
import { Check, Pencil, Trash2 } from 'lucide-react';
import { NoteForm } from './NoteForm';
import { cn } from '../../utils/cn';

export const NoteItem = memo(function NoteItem({ note, onToggle, onDelete, onEdit }) {
  // Local, UI-only state — whether THIS row is mid-edit has no reason to
  // live in the notes reducer or anywhere else; nothing outside this
  // component needs to know about it.
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="rounded-md border border-border bg-surface p-3">
        <NoteForm
          initialValues={{ title: note.title, description: note.description }}
          submitLabel="Save"
          onCancel={() => setIsEditing(false)}
          onSubmit={(values) => {
            onEdit(note.id, values);
            setIsEditing(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-md border border-border bg-surface p-3">
      <button
        onClick={() => onToggle(note.id)}
        aria-label="Toggle complete"
        className={cn(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
          note.completed ? 'border-success bg-success text-white' : 'border-border'
        )}
      >
        {note.completed && <Check size={12} />}
      </button>
      <div className="flex-1">
        <p className={cn('text-sm font-medium text-ink', note.completed && 'text-ink-faint line-through')}>
          {note.title}
        </p>
        {note.description && (
          <p className={cn('text-sm text-ink-muted', note.completed && 'line-through')}>{note.description}</p>
        )}
      </div>
      <button onClick={() => setIsEditing(true)} aria-label="Edit note" className="text-ink-faint hover:text-ink">
        <Pencil size={14} />
      </button>
      <button onClick={() => onDelete(note.id)} aria-label="Delete note" className="text-ink-faint hover:text-danger">
        <Trash2 size={14} />
      </button>
    </div>
  );
});
