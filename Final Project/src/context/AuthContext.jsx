import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';

const AuthContext = createContext(null);

/**
 * There's no backend, so "auth" here means: a list of registered users kept
 * in localStorage, and a currentUser pointer into that list. login/register
 * are still async-shaped in spirit (they return a result object) so
 * swapping this for a real API later wouldn't change how callers use it.
 */
export function AuthProvider({ children }) {
  const [registeredUsers, setRegisteredUsers] = useLocalStorage(STORAGE_KEYS.REGISTERED_USERS, []);
  const [user, setUser] = useLocalStorage(STORAGE_KEYS.CURRENT_USER, null);

  const login = useCallback(
    ({ email, password }) => {
      const match = registeredUsers.find((u) => u.email === email && u.password === password);
      if (!match) return { success: false, message: 'Invalid email or password.' };
      setUser(match);
      return { success: true };
    },
    [registeredUsers, setUser]
  );

  const register = useCallback(
    ({ name, email, password }) => {
      const exists = registeredUsers.some((u) => u.email === email);
      if (exists) return { success: false, message: 'An account with this email already exists.' };

      const newUser = {
        id: crypto.randomUUID(),
        name,
        email,
        password,
        avatarUrl: null,
        joinedAt: new Date().toISOString(),
      };
      setRegisteredUsers((prev) => [...prev, newUser]);
      setUser(newUser);
      return { success: true };
    },
    [registeredUsers, setRegisteredUsers, setUser]
  );

  const logout = useCallback(() => setUser(null), [setUser]);

  const updateProfile = useCallback(
    (updates) => {
      setUser((prev) => ({ ...prev, ...updates }));
      setRegisteredUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, ...updates } : u)));
    },
    [setUser, setRegisteredUsers, user]
  );

  // Memoised so this object's reference only changes when something inside
  // it genuinely changed. All four functions above are themselves stable
  // (useCallback), so this only changes when `user` changes — meaning a
  // component that only reads `user` won't re-render over something
  // unrelated changing elsewhere in the provider.
  const value = useMemo(
    () => ({ user, login, register, logout, updateProfile }),
    [user, login, register, logout, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
