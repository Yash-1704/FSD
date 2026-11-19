// Centralised localStorage keys. Every context that persists data pulls its
// key from here instead of hardcoding a string, so there's exactly one place
// to check if something isn't persisting correctly.
export const STORAGE_KEYS = {
  CURRENT_USER: 'crate_current_user',
  REGISTERED_USERS: 'crate_registered_users',
  CART: 'crate_cart',
  WISHLIST: 'crate_wishlist',
  NOTES: 'crate_notes',
  THEME: 'crate_theme',
};
