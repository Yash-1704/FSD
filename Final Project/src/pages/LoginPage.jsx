import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { isRequired, isValidEmail } from '../utils/validators';

function validate(values) {
  const errors = {};
  if (!isRequired(values.email)) errors.email = 'Email is required';
  else if (!isValidEmail(values.email)) errors.email = 'Enter a valid email';
  if (!isRequired(values.password)) errors.password = 'Password is required';
  return errors;
}

export default function LoginPage() {
  const { values, errors, handleChange, handleSubmit } = useForm({ email: '', password: '' }, validate);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (formValues) => {
    const result = login(formValues);
    if (!result.success) {
      showToast(result.message, 'error');
      return;
    }
    showToast('Welcome back!', 'success');
    // ProtectedRoute redirects here with state.from set to wherever the
    // user was actually headed (e.g. /wishlist) — send them back there
    // instead of always landing on the dashboard.
    const redirectTo = location.state?.from?.pathname || '/dashboard';
    navigate(redirectTo, { replace: true });
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Log in</h1>
      <p className="mt-1 text-sm text-ink-muted">Welcome back to Crate.</p>

      <form onSubmit={handleSubmit(handleLogin)} className="mt-6 flex flex-col gap-4">
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
        <Button type="submit" className="mt-2">
          Log in
        </Button>
      </form>

      <p className="mt-6 text-sm text-ink-muted">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-accent">
          Create one
        </Link>
      </p>
    </div>
  );
}
