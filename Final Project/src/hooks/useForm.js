import { useState, useCallback } from 'react';

/**
 * A small, from-scratch version of what libraries like react-hook-form do:
 * track field values, run a validate function on submit, and only call the
 * real submit handler if there are no errors.
 *
 * `validate` is optional and has the shape (values) => errorsObject.
 */
export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }, []);

  // handleSubmit is a function that RETURNS the actual event handler —
  // this is what lets JSX write onSubmit={handleSubmit(mySubmitFn)}. The
  // returned function closes over `mySubmitFn`, `values`, and `validate`.
  const handleSubmit = useCallback(
    (onValid) => (event) => {
      event.preventDefault();
      const validationErrors = validate ? validate(values) : {};
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        onValid(values);
      }
    },
    [validate, values]
  );

  const reset = useCallback(
    (nextValues = initialValues) => {
      setValues(nextValues);
      setErrors({});
    },
    [initialValues]
  );

  return { values, errors, handleChange, handleSubmit, reset, setValues };
}
