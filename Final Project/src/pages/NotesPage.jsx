import { useState, useMemo } from 'react';
import { useLocalStorageReducer } from '../hooks/useLocalStorageReducer';
import { NoteForm } from '../components/notes/NoteForm';
import { NoteList } from '../components/notes/NoteList';
import { STORAGE_KEYS } from '../utils/constants';
import { cn } from '../utils/cn';

function notesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [{ id: crypto.randomUUID(), completed: false, ...action.payload }, ...state];
    case 'TOGGLE':
      return state.map((note) => (note.id === action.id ? { ...note, completed: !note.completed } : note));
    case 'DELETE':
      return state.filter((note) => note.id !== action.id);
    case 'EDIT':
      return state.map((note) => (note.id === action.id ? { ...note, ...action.payload } : note));
    default:
      return state;
  }
}

// Seeds a first-time user with a couple of notes so the page isn't
// completely empty on first visit — after that, whatever's in
// localStorage takes over entirely.
const SEED_NOTES = [
  {
    id: 'seed-1',
    title: 'Explore the products page',
    description: 'Try the search, filters, and sorting.',
    completed: false,
  },
  {
    id: 'seed-2',
    title: 'Add something to your wishlist',
    description: 'The heart icon on any product card.',
    completed: true,
  },
];

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
];

export default function NotesPage() {
  const [notes, dispatch] = useLocalStorageReducer(notesReducer, SEED_NOTES, STORAGE_KEYS.NOTES);
  const [filter, setFilter] = useState('all');

  const visibleNotes = useMemo(() => {
    if (filter === 'active') return notes.filter((note) => !note.completed);
    if (filter === 'completed') return notes.filter((note) => note.completed);
    return notes;
  }, [notes, filter]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Notes</h1>
      <p className="mt-1 text-sm text-ink-muted">Personal notes, saved only in this browser.</p>

      <div className="mt-6 rounded-lg border border-border bg-surface p-4">
        <NoteForm onSubmit={(values) => dispatch({ type: 'ADD', payload: values })} />
      </div>

      <div className="mt-6 flex gap-1">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              filter === item.id ? 'bg-accent-soft text-accent-dark' : 'text-ink-muted hover:bg-paper'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <NoteList
          notes={visibleNotes}
          onToggle={(id) => dispatch({ type: 'TOGGLE', id })}
          onDelete={(id) => dispatch({ type: 'DELETE', id })}
          onEdit={(id, payload) => dispatch({ type: 'EDIT', id, payload })}
        />
      </div>
    </div>
  );
}
