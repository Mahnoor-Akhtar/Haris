import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: 'sale' | 'new' | 'bestseller';
  colors: string[];
  sizes: string[];
  has3D: boolean;
  description: string;
  material: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface StoreState {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  theme: (typeof window !== 'undefined' && localStorage.getItem('rcs-theme') as 'dark' | 'light') || 'dark',
  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('rcs-theme', next);
    document.documentElement.setAttribute('data-theme', next);
    set({ theme: next });
  },
  cart: [],
  addToCart: (item) => set((s) => {
    const existing = s.cart.find(c => c.product.id === item.product.id && c.selectedColor === item.selectedColor && c.selectedSize === item.selectedSize);
    if (existing) {
      return { cart: s.cart.map(c => c === existing ? { ...c, quantity: c.quantity + item.quantity } : c), cartOpen: true };
    }
    return { cart: [...s.cart, item], cartOpen: true };
  }),
  removeFromCart: (id) => set((s) => ({ cart: s.cart.filter(c => c.product.id !== id) })),
  updateQuantity: (id, qty) => set((s) => ({
    cart: qty <= 0 ? s.cart.filter(c => c.product.id !== id) : s.cart.map(c => c.product.id === id ? { ...c, quantity: qty } : c)
  })),
  cartOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  wishlist: [],
  toggleWishlist: (id) => set((s) => ({
    wishlist: s.wishlist.includes(id) ? s.wishlist.filter(i => i !== id) : [...s.wishlist, id]
  })),
}));
