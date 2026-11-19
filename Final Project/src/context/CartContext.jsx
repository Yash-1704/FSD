import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorageReducer } from '../hooks/useLocalStorageReducer';
import { STORAGE_KEYS } from '../utils/constants';

const CartContext = createContext(null);

// A pure function: same (state, action) in, same new state out, no side
// effects. useReducer suits the cart well because "add/remove/update
// quantity/clear" are well-defined transitions on the same list, rather
// than several independent values.
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existing = state.find((item) => item.id === product.id);
      if (existing) {
        return state.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...state, { ...product, quantity }];
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.id);
    case 'UPDATE_QUANTITY':
      // Dropping quantity to 0 removes the item rather than leaving a
      // zero-quantity row sitting in the cart.
      if (action.quantity < 1) return state.filter((item) => item.id !== action.id);
      return state.map((item) => (item.id === action.id ? { ...item, quantity: action.quantity } : item));
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useLocalStorageReducer(cartReducer, [], STORAGE_KEYS.CART);

  const addItem = useCallback((product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  }, [dispatch]);

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  }, [dispatch]);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  }, [dispatch]);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
