import { useEffect, useRef } from 'react';
import { useForm } from '../../hooks/useForm';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { isRequired } from '../../utils/validators';

function validate(values) {
  const errors = {};
  if (!isRequired(values.title)) errors.title = 'Title is required';
  return errors;
}

export function NoteForm({
  initialValues = { title: '', description: '' },
  onSubmit,
  onCancel,
  submitLabel = 'Add note',
}) {
  const { values, errors, handleChange, handleSubmit, reset } = useForm(initialValues, validate);
  const titleRef = useRef(null);

  // Autofocus on mount — useful both for the "add a note" form at the top
  // of the page and when this same form re-appears inline for editing.
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  // Clears the fields after a successful add so the form is ready for the
  // next note. In edit mode this component unmounts right after submit
  // anyway (see NoteItem), so the reset is harmless there too.
  const handleValidSubmit = (formValues) => {
    onSubmit(formValues);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)} className="flex flex-col gap-3">
      <Input
        ref={titleRef}
        name="title"
        placeholder="Note title"
        value={values.title}
        onChange={handleChange}
        error={errors.title}
      />
      <textarea
        name="description"
        placeholder="Description (optional)"
        value={values.description}
        onChange={handleChange}
        rows={2}
        className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent"
      />
      <div className="flex gap-2">
        <Button type="submit" size="sm">
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
