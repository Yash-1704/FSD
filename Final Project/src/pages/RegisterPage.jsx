import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { isRequired, isValidEmail, hasMinLength } from '../utils/validators';

function validate(values) {
  const errors = {};
  if (!isRequired(values.name)) errors.name = 'Name is required';
  if (!isRequired(values.email)) errors.email = 'Email is required';
  else if (!isValidEmail(values.email)) errors.email = 'Enter a valid email';
  if (!hasMinLength(values.password, 6)) errors.password = 'Minimum 6 characters';
  if (values.confirmPassword !== values.password) errors.confirmPassword = "Passwords don't match";
  return errors;
}

export default function RegisterPage() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { name: '', email: '', password: '', confirmPassword: '' },
    validate
  );
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleRegister = (formValues) => {
    const result = register(formValues);
    if (!result.success) {
      showToast(result.message, 'error');
      return;
    }
    showToast('Account created!', 'success');
    navigate('/dashboard', { replace: true });
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Create an account</h1>
      <p className="mt-1 text-sm text-ink-muted">Takes less than a minute.</p>

      <form onSubmit={handleSubmit(handleRegister)} className="mt-6 flex flex-col gap-4">
        <Input label="Name" name="name" value={values.name} onChange={handleChange} error={errors.name} />
        <Input
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        <Button type="submit" className="mt-2">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-sm text-ink-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-accent">
          Log in
        </Link>
      </p>
    </div>
  );
}
