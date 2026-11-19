// Small, composable checks. Each page writes its own `validate(values)`
// function (see LoginPage, RegisterPage, NotesPage) and calls these instead
// of repeating regex/logic inline every time.

export function isRequired(value) {
  return value !== undefined && value !== null && String(value).trim().length > 0;
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value ?? '');
}

export function hasMinLength(value, length) {
  return String(value ?? '').trim().length >= length;
}
