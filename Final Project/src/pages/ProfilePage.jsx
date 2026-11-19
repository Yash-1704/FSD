import { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { isRequired, isValidEmail } from '../utils/validators';

function validate(values) {
  const errors = {};
  if (!isRequired(values.name)) errors.name = 'Name is required';
  if (!isRequired(values.email)) errors.email = 'Email is required';
  else if (!isValidEmail(values.email)) errors.email = 'Enter a valid email';
  return errors;
}

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const { values, errors, handleChange, handleSubmit } = useForm(
    { name: user.name, email: user.email },
    validate
  );

  // A file input's value can't be set programmatically — browsers block it
  // for security — so it can never be "controlled" the way the Input
  // fields above are. Instead: hide the real input, trigger it
  // imperatively via a ref from a nicer-looking button, and read the file
  // through a plain onChange when the user actually picks one.
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = (formValues) => {
    updateProfile({ ...formValues, avatarUrl: avatarPreview });
    showToast('Profile updated', 'success');
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Profile</h1>
      <p className="mt-1 text-sm text-ink-muted">Update your account details.</p>

      <div className="mt-6 flex items-center gap-4">
        <div className="relative">
          {avatarPreview ? (
            <img src={avatarPreview} alt="" className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-lg font-semibold text-accent-dark">
              {user.name?.[0]?.toUpperCase()}
            </div>
          )}
          <button
            onClick={() => fileInputRef.current.click()}
            aria-label="Change photo"
            className="absolute -bottom-1 -right-1 rounded-full bg-ink p-1.5 text-paper"
          >
            <Camera size={12} />
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>
        <p className="text-sm text-ink-muted">JPG or PNG. Saved locally only.</p>
      </div>

      <form onSubmit={handleSubmit(handleSave)} className="mt-6 flex max-w-sm flex-col gap-4">
        <Input label="Name" name="name" value={values.name} onChange={handleChange} error={errors.name} />
        <Input
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Button type="submit" className="mt-2 self-start">
          Save changes
        </Button>
      </form>
    </div>
  );
}
