import { NoteItem } from './NoteItem';
import { EmptyState } from '../common/EmptyState';

export function NoteList({ notes, onToggle, onDelete, onEdit }) {
  if (notes.length === 0) {
    return <EmptyState title="No notes here" description="Add a note above to get started." />;
  }

  return (
    <div className="flex flex-col gap-2">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}
